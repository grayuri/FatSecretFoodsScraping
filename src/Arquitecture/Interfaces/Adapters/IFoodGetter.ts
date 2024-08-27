import { IFood } from "../Entities/IFood"

export interface IFoodGetter {
  foods: IFood[]
  getFoodFacts(foodLink: string, name: string, category: string): Promise<IFood>
  getAllFoodsFacts(): void
}