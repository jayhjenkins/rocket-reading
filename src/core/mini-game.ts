import { Item, MiniGameConfig, Rating, ResponseData } from '../types'

export interface MiniGameState {
  isLoading: boolean
  isSubmitting: boolean
  error: string | null
}

export abstract class MiniGame {
  protected item: Item
  protected config: MiniGameConfig
  protected responseStartTime: number = 0

  constructor(config: MiniGameConfig) {
    this.item = config.item
    this.config = config
  }

  abstract render(): React.ReactNode

  abstract captureResponse(): Promise<ResponseData>

  abstract showGradingUI(): React.ReactNode

  abstract submitReview(rating: Rating, responseData: ResponseData): Promise<void>

  protected calculateResponseTime(): number {
    return Date.now() - this.responseStartTime
  }

  protected startTimer(): void {
    this.responseStartTime = Date.now()
  }
}
