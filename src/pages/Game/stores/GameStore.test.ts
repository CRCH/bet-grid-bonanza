import { vi } from 'vitest'

import { GameStore } from './GameStore.store'

import { GamePhase, GameResultPayload, WSClientMessage } from 'types/index.types'

vi.useFakeTimers()

const mockWebSocket: any = {
  send: vi.fn(),
  close: vi.fn(),
  CONNECTING: WebSocket.CONNECTING,
  OPEN: WebSocket.OPEN,
  CLOSING: WebSocket.CLOSING,
  CLOSED: WebSocket.CLOSED,
}

describe('GameStore', () => {
  let store: GameStore
  let mockPayload: GameResultPayload
  let originalWebSocket: typeof WebSocket

  beforeAll(() => {
    originalWebSocket = global.WebSocket
  })

  afterAll(() => {
    global.WebSocket = originalWebSocket
  })

  beforeEach(() => {
    ;(global as any).WebSocket = vi.fn().mockImplementation(() => mockWebSocket)

    store = new GameStore()

    mockPayload = {
      phase: GamePhase.GameResult,
      balance: 100,
      payout: 50,
      multipliers: { A1: 2 },
    }
  })

  test('should initialize correctly', () => {
    store.init(5)
    expect(store.gamePhase).toBe(GamePhase.NotStarted)
    expect(store.balance).toBe(0)
    expect(store.multipliers).toEqual({})
    expect(store.payout).toBe(0)
    expect(store.websocket).not.toBeNull()
    expect(store.field.size).toEqual(25)
    expect(store.affectedCells.size).toEqual(0)
  })

  test('should correctly initialize field', () => {
    store.initField(5)
    expect(store.field.size).toBe(25)
  })

  test('should initialize WebSocket correctly', () => {
    store.init(5)

    expect(global.WebSocket).toBeCalledWith('wss://hometask.me?field=25')
    expect(store.websocket).toBeDefined()
    expect(store.field.size).toBe(25)
  })

  test('should update balance', () => {
    store.updateBalance(100)
    expect(store.balance).toBe(100)
  })

  test('should set bets phase', () => {
    store.setBetsPhase(mockPayload)
    expect(store.balance).toBe(mockPayload.balance)
    expect(store.gamePhase).toBe(mockPayload.phase)
  })

  test('should handle game result', () => {
    store.init(5)
    store.handleGameResult(mockPayload)
    expect(store.balance).toBe(100)
    expect(store.payout).toBe(50)
    expect(store.affectedCells.has('A1')).toBe(true)
  })

  test('should clean up', () => {
    store.handleGameResult(mockPayload)
    store.cleanUp()
    expect(store.affectedCells.size).toBe(0)
    expect(store.field.get('A1')?.multiplier).toBeUndefined()
  })

  test('should close websocket', () => {
    store.init(5)
    store.close()
    expect(mockWebSocket.close).toBeCalledTimes(1)
  })

  test('should place bet', () => {
    store.init(5)
    store.updateBalance(100)
    store.gamePhase = GamePhase.BetsOpen
    store.placeBet('A1', 10)
    expect(store.balance).toBe(90)
    expect(store.affectedCells.has('A1')).toBe(true)
    expect(mockWebSocket.send).toBeCalledWith(
      JSON.stringify({
        type: WSClientMessage.placeBet,
        action: { A1: 10 },
      })
    )
  })

  test('should start game', () => {
    store.init(5)
    store.startGame()
    expect(mockWebSocket.send).toBeCalledWith(
      JSON.stringify({
        type: WSClientMessage.startGame,
      })
    )
  })
})
