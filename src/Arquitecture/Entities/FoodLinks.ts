import { IFoodLinks } from "../Interfaces/Entities/IFoodLinks"

export class FoodLinks implements IFoodLinks{
  public foodName: string
  public categoryName: string
  public foodCategoryLink: string
  public foodOverviewLink: string
  public foodLink: string
  public foodWithRightServingSize: string

  constructor(data: FoodLinks) {
    this.foodName = data.foodName
    this.categoryName = data.categoryName
    this.foodCategoryLink  = data.foodCategoryLink
    this.foodOverviewLink  = data.foodOverviewLink
    this.foodLink  = data.foodLink
    this.foodWithRightServingSize  = data.foodWithRightServingSize
  }
}