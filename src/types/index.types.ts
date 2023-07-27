export enum GamePhase {
  BetsOpen = 'BetsOpen',
  BetsClosed = 'BetsClosed',
  GameResult = 'GameResult',
  NotStarted = 'NotStarted',
}

export enum ServerMessageType {
  settings = 'settings',
  game = 'game',
  error = 'error',
}

export enum WSClientMessage {
  startGame = 'startGame',
  placeBet = 'placeBet',
}

export type SettingsPayload = {
  betLimits: {
    min: number
    max: number
  }
  chips: number[]
}

export interface GameResultPayload {
  phase: GamePhase
  balance: number
  multipliers: Record<string, number>
  payout: number
}

export interface ErrorPayload {
  type: ServerMessageType.error
  message: string
}

export interface SettingsMessage {
  type: ServerMessageType.settings
  payload: SettingsPayload
}

interface GameMessage {
  type: ServerMessageType.game
  payload: GameResultPayload
}

export type WebSocketMessage = SettingsMessage | GameMessage | ErrorPayload
