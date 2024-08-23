import { IFoodLinks } from "../Entities/IFoodLinks"

export interface IFoodLinksController {
  getFoodLinks(foodLink: string): IFoodLinks
  getFoodsLinks(): IFoodLinks[]
  writeFoodLinks(): void
}