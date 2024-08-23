import { IFood } from "../Entities/IFood"

export interface IFoodController {
  getFood(foodLink: string): IFood
  getFoods(): IFood[]
  writeFood(): void
}