import { makeAutoObservable } from 'mobx'
import { GameStore } from './GameStore.store'

class FieldCell {
  id = ''
  gameStore: GameStore
  balance = 0
  multiplier = 0

  constructor(gameStore: GameStore, id: string) {
    makeAutoObservable(this)
    this.gameStore = gameStore
    this.id = id
  }

  placeBet = (amount: number) => {
    const success = this.gameStore.placeBet(this.id, amount)
    if (success) this.balance += amount
  }

  get getMultipliedBalance(): number {
    if (this.balance !== 0 && this.multiplier !== 0) {
      return this.balance * this.multiplier
    }
    return this.balance
  }
}

export default FieldCell
