import { makeAutoObservable } from 'mobx'
import { GameStore } from './GameStore.store'

class FieldCell {
  id = ''
  gameStore: GameStore
  cellBalance = 0
  multiplier = 0

  constructor(gameStore: GameStore, id: string) {
    makeAutoObservable(this)
    this.gameStore = gameStore
    this.id = id
  }

  placeBet = (amount: number) => {
    this.gameStore.placeBet(this.id, amount)
    this.cellBalance += amount
  }
}

export default FieldCell
