import { IFoodLinks } from "../Entities/IFoodLinks"

export interface IFoodLinksGetter {
  foodsLinks: IFoodLinks[]
  openHub(): void
  getFoodsCategoryLinks(): Promise<string[]>
  getFoodsCategoryNames(): Promise<string[]>
  getFoodsNames(categoryLink: string): Promise<string[]>
  getFoodsOverviewLinks(categoryLink: string): Promise<string[]>
  getFoodLink(overviewLink: string): Promise<string>
  getFoodWithRightServingSizeLink(foodLink: string): Promise<string>
  getAllFoodsLinks(): void
}