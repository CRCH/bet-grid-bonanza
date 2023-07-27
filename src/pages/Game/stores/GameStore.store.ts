import { makeAutoObservable } from 'mobx'

import FieldCell from './FieldCellStore.store'

import { ConnectionStatus, FieldSize } from './GameStore.types'
import { GamePhase, GameResultPayload, ServerMessageType, WSClientMessage, WebSocketMessage } from 'types/index.types'

class GameStore {
  constructor() {
    makeAutoObservable(this)
  }

  gamePhase: GamePhase = GamePhase.NotStarted
  balance = 0
  multipliers: GameResultPayload['multipliers'] = {}
  payout: GameResultPayload['payout'] = 0
  websocket: WebSocket | null = null
  connectionStatus: ConnectionStatus = ConnectionStatus.disconnected
  field: Map<string, FieldCell> = new Map()
  affectedCells: Set<string> = new Set()
  connectionError = false
  totalBet = 0

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
    console.log('OnOpen', props)
    this.connectionStatus = ConnectionStatus.connected
    console.log(this.connectionStatus)
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
    console.log('setBetsPhase')
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
    }
  }

  onMessage = ({ data }: MessageEvent) => {
    const message: WebSocketMessage = JSON.parse(data)

    switch (message.type) {
      case ServerMessageType.error:
        console.error('error', message.message)
        break
      case ServerMessageType.settings:
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
    console.log('onClose', props)
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
    console.log('sent', messageType, messageData)

    this.websocket?.send(
      JSON.stringify({
        type: messageType,
        action: messageData,
      })
    )
  }

  placeBet = (target: string, amount = 0.1): boolean => {
    if (this.gamePhase !== GamePhase.BetsOpen) return false

    this.updateBalance(this.balance - amount)
    this.affectedCells.add(target)
    this.sendMessage(WSClientMessage.placeBet, {
      [target]: amount,
    })
    this.totalBet += amount

    return true
  }

  startGame = () => {
    this.sendMessage(WSClientMessage.startGame)
  }
}

export { GameStore }

export default new GameStore()
