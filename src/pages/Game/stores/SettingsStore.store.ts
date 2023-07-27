import { makeAutoObservable } from 'mobx'
import { SettingsPayload } from 'types/index.types'

class SettingsStore {
  constructor({ betLimits, chips }: SettingsPayload) {
    makeAutoObservable(this)
    this.betLimits = betLimits
    this.chips = chips
  }
  betLimits: SettingsPayload['betLimits'] = {
    min: 0,
    max: 0,
  }
  chips: SettingsPayload['chips'] = []
  activeBet = 0.1

  setActiveBet = (bet: number) => {
    if (this.activeBet !== bet) this.activeBet = bet
  }
}

export default SettingsStore
