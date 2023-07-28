import { makeAutoObservable, toJS } from 'mobx'

import FieldCell from './FieldCellStore.store'

import { ConnectionStatus, FieldSize } from './GameStore.types'
import { GamePhase, GameResultPayload, ServerMessageType, WSClientMessage, WebSocketMessage } from 'types/index.types'
import SettingsStore from './SettingsStore.store'
import { mergeBets } from '@helpers/mergeBets'
import { revertBet } from '@helpers/revertBet'

class GameStore {
  constructor() {
    makeAutoObservable(this)
  }

  gamePhase: GamePhase = GamePhase.NotStarted
  balance = 0
  totalBet = 0
  payout = 0
  websocket: WebSocket | null = null
  connectionStatus: ConnectionStatus = ConnectionStatus.disconnected
  field: Map<string, FieldCell> = new Map()
  affectedCells: Set<string> = new Set()
  connectionError = false
  gameSettings: SettingsStore = new SettingsStore({ betLimits: { min: 0, max: 0 }, chips: [] })
  roundBets: Record<string, number> = {}
  previousRoundBets: Record<string, number> = {}
  previousRoundTotal = 0
  lastRoundBets: Record<string, number>[] = []

  init = (fieldSize: FieldSize) => {
    this.websocket = new WebSocket(`wss://hometask.me?field=${fieldSize ** 2}`)

    // Subscribe to WebSocket events
    this.websocket.onopen = this.onOpen
    this.websocket.onmessage = this.onMessage
    this.websocket.onclose = this.onClose
    this.websocket.onerror = this.onError

    this.initField(fieldSize)
  }

  initField = (fieldSize: FieldSize) => {
    Array.from({ length: fieldSize }, (_, i) =>
      Array.from({ length: fieldSize }, (_, j) => `${String.fromCharCode(65 + j)}${i + 1}`)
    )
      .flat()
      .map((id) => this.field.set(id, new FieldCell(this, id)))
  }

  get fieldArray(): FieldCell[] {
    return [...this.field.values()]
  }

  onOpen = (props: Event) => {
    this.connectionStatus = ConnectionStatus.connected
  }

  close = () => {
    this.websocket?.close()
  }

  onError = (event: Event) => {
    console.error('WebSocket error:', event)
    this.connectionError = true
  }

  updateBalance = (newBalance: number) => {
    this.balance = newBalance
  }

  setBetsPhase = (payload: GameResultPayload) => {
    this.updateBalance(payload.balance)
    this.gamePhase = payload.phase
  }

  handleGameResult = (payload: GameResultPayload) => {
    this.updateBalance(payload.balance)
    this.payout = payload.payout
    this.handleMultipliers(payload.multipliers)
    // this.multipliers.push(payload.multipliers)
  }

  handleMultipliers = (multipliers: Record<string, number>) => {
    Object.entries(multipliers).forEach(([key, value]) => {
      const cell = this.field.get(key)
      if (cell) {
        cell.multiplier = value
        this.affectedCells.add(key)
      }
    })
  }

  cleanUp = () => {
    if (this.affectedCells.size > 0) {
      ;[...this.affectedCells].forEach((id) => {
        this.field.set(id, new FieldCell(this, id))
      })
      this.totalBet = 0
      this.affectedCells.clear()
      this.roundBets = {}
      this.lastRoundBets = []
    }
  }

  onMessage = ({ data }: MessageEvent) => {
    const message: WebSocketMessage = JSON.parse(data)

    switch (message.type) {
      case ServerMessageType.error:
        console.error('error', message.message)
        break
      case ServerMessageType.settings:
        this.gameSettings = new SettingsStore(message.payload)
        break
      case ServerMessageType.game:
        if (message.payload.phase === GamePhase.GameResult) {
          this.handleGameResult(message.payload)
        }
        if (message.payload.phase === GamePhase.BetsOpen) {
          this.cleanUp()
        }
        this.updateBalance(message.payload.balance)
        this.gamePhase = message.payload.phase
        break
    }
  }

  onClose = (props: CloseEvent) => {
    this.connectionStatus = ConnectionStatus.disconnected
  }

  handleConnectionStatusChange = (status: ConnectionStatus) => {
    // Perform actions based on connection status change
    if (status === 'connected') {
      // Do something when connected
    } else if (status === 'disconnected') {
      // Do something when disconnected
    }
  }

  sendMessage = (messageType: WSClientMessage, messageData?: Record<string, number>) => {
    this.websocket?.send(
      JSON.stringify({
        type: messageType,
        action: messageData,
      })
    )
  }

  logBet = (target: string, amount: number) => {
    if (amount > 0) this.affectedCells.add(target)

    const bet = { [target]: amount }
    this.lastRoundBets.push(bet)
    this.roundBets = mergeBets(this.roundBets, bet)
  }

  validateBet = (amount: number): boolean => {
    const nextTotalBet = amount + this.totalBet
    return amount <= this.balance && this.gameSettings.betLimits.max >= nextTotalBet
  }

  placeBet = (target: string, amount = 0.1): boolean => {
    const isValid = this.validateBet(amount)
    if (this.gamePhase !== GamePhase.BetsOpen || !isValid) return false

    this.updateBalance(this.balance - amount)

    this.logBet(target, amount)
    this.sendMessage(WSClientMessage.placeBet, {
      [target]: amount,
    })
    this.totalBet += amount

    return true
  }

  startGame = () => {
    this.previousRoundBets = this.roundBets
    this.previousRoundTotal = this.totalBet
    this.sendMessage(WSClientMessage.startGame)
  }

  clearBets = () => {
    this.sendMessage(WSClientMessage.placeBet, revertBet(this.roundBets))
    this.totalBet = 0
    this.updateBalance(Object.values(this.roundBets).reduce((a, b) => a + b, this.balance))
    this.cleanUp()
  }

  undoLastBet = () => {
    const lastBet = this.lastRoundBets[this.lastRoundBets.length - 1]
    Object.keys(lastBet).forEach((key) => {
      const field = this.field.get(key)
      if (!field) return
      const value = lastBet[key]
      this.roundBets[key] -= value
      field.balance -= value
      this.totalBet -= value
      this.updateBalance(this.balance + value)
    })

    this.sendMessage(WSClientMessage.placeBet, revertBet(lastBet))
    this.lastRoundBets = this.lastRoundBets.slice(0, -1)
  }

  doubleBets = () => {
    if (!this.validateBet(this.totalBet)) return

    this.sendMessage(WSClientMessage.placeBet, this.roundBets)
    this.lastRoundBets.push({ ...this.roundBets })
    this.updateBalance(this.balance - this.totalBet)
    this.totalBet *= 2
    Object.keys(this.roundBets).forEach((key) => {
      const field = this.field.get(key)
      if (!field) return

      this.roundBets[key] = this.roundBets[key] * 2
      field.balance *= 2
    })
  }

  repeatBets = () => {
    if (!this.validateBet(this.previousRoundTotal)) return
    this.sendMessage(WSClientMessage.placeBet, this.previousRoundBets)
    this.lastRoundBets.push({ ...this.previousRoundBets })
    this.updateBalance(this.balance - this.previousRoundTotal)
    this.totalBet = this.previousRoundTotal
    Object.keys(this.previousRoundBets).forEach((key) => {
      const field = this.field.get(key)
      if (!field) return

      this.roundBets[key] = this.previousRoundBets[key]
      field.balance += this.previousRoundBets[key]
      this.affectedCells.add(key)
    })

    this.previousRoundBets = {}
  }
}

export { GameStore }

export default new GameStore()
