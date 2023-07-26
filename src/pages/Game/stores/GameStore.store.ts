import { makeAutoObservable, reaction, runInAction } from 'mobx'

enum ConnectionStatus {
  connected = 'connected',
  disconnected = 'disconnected',
}

class GameStore {
  constructor() {
    makeAutoObservable(this)
  }

  gamePhase = 'notStarted'
  balance = 0
  multipliers = []
  payout = 0
  websocket: WebSocket | null = null
  connectionStatus: ConnectionStatus = ConnectionStatus.disconnected

  init = () => {
    if (this.websocket) return this.websocket

    this.websocket = new WebSocket('wss://hometask.me?field=25')

    // Subscribe to WebSocket events
    this.websocket.onopen = this.onOpen
    this.websocket.onmessage = this.onMessage
    this.websocket.onclose = this.onClose
    this.websocket.onerror = this.onError
  }

  onOpen = (...props: any) => {
    console.log('OnOpen', props)
    this.connectionStatus = ConnectionStatus.connected
    console.log(this.connectionStatus)
  }

  close = () => {
    this.websocket?.close()
  }

  onError = (...error: any) => {
    console.error('WebSocket error:', error)
  }

  updateBalance = (newBalance: number) => {
    this.balance = newBalance
  }

  setBetsPhase = (payload: any) => {
    console.log('setBetsPhase')
    this.updateBalance(payload.balance)
    this.gamePhase = payload.phase
  }

  handleGameResult = (payload: any) => {
    this.updateBalance(payload.balance)
    this.payout = payload.payout
    this.multipliers.push(payload.multipliers)
  }

  onMessage = (event: MessageEvent) => {
    console.log('onMessage', event.data)
    const message = JSON.parse(event.data)
    if (message.type === 'settings') {
      return
    }

    if (message.type === 'game') {
      if (message.payload.phase === 'GameResult') {
        this.handleGameResult(message.payload)
      }

      this.setBetsPhase(message.payload)
    }
  }

  onClose = (...props: any) => {
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

  sendMessage = (actionType: string, actionData?: any) => {
    console.log('sent', actionType, actionData)

    this.websocket?.send(
      JSON.stringify({
        type: actionType,
        action: actionData,
      })
    )
  }

  placeBet = (target: string, amount = 1) => {
    if (this.gamePhase !== 'BetsOpen') return

    const data = {
      [target]: amount,
    }
    this.updateBalance(this.balance - amount)
    this.sendMessage('placeBet', data)
  }

  startGame = () => {
    this.sendMessage('startGame')
  }
}

export default new GameStore()
