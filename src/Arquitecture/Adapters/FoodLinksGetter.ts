import { IFoodLinks } from "../Interfaces/Entities/IFoodLinks";
import { FoodLinks } from "../Entities/FoodLinks";
import { IFoodLinksGetter } from "../Interfaces/Adapters/IFoodLinksGetter";

interface constructorProps {
  scrapper: any
  db: any
}

export class FoodLinksGetter implements IFoodLinksGetter {
  private scrapper: any
  private db: any
  public foodsLinks: IFoodLinks[]

  constructor({ scrapper, db }: constructorProps) {
    this.scrapper = scrapper
    this.db = db
    this.foodsLinks = []
  }

  async openHub() {
    await this.scrapper.start()
    await this.scrapper.openPage("https://www.fatsecret.com/calories-nutrition/group/beans-and-legumes")
  }

  async getFoodsCategoryNames(): Promise<string[]> {
    await this.openHub()
    const foodsCategoryNames = await this.scrapper.getElements("table.common>tbody>tr>td>a", "innerText")
    await this.scrapper.finish()
    return foodsCategoryNames
  }

  async getFoodsCategoryLinks(): Promise<string[]> {
    await this.openHub()
    const fooodsCategoryLinks = await this.scrapper.getElements("table.common>tbody>tr>td>a", "href")
    await this.scrapper.finish()
    return fooodsCategoryLinks
  }

  async getFoodsNames(categoryLink: string): Promise<string[]> {
    await this.scrapper.start()
    await this.scrapper.openPage(categoryLink)
    const foodsNames = await this.scrapper.getElements(".secHolder>h2", "innerText")
    await this.scrapper.finish()
    return foodsNames
  }

  async getFoodsOverviewLinks(categoryLink: string): Promise<string[]> {
    await this.scrapper.start()
    await this.scrapper.openPage(categoryLink)
    const foodsOverviewLinks = await this.scrapper.getElements(".secHolder>h2>a", "href")
    await this.scrapper.finish()
    return foodsOverviewLinks
  }

  async getFoodLink(overviewLink: string): Promise<string> {
    await this.scrapper.start()
    await this.scrapper.openPage(overviewLink)
    const foodLink = await this.scrapper.getElement(".bbTitle>a", "href")
    await this.scrapper.finish()
    return foodLink
  }

  async getFoodWithRightServingSizeLink(foodLink: string): Promise<string> {
    await this.scrapper.start()
    await this.scrapper.openPage(foodLink)

    const elementSelector = "td.borderBottom>a"
    const servingSizesTypes = await this.scrapper.getElements(elementSelector, "innerText")
    const servingSizesTypesLinks = await this.scrapper.getElements(elementSelector, "href")
    const rightServingSizeTypeIndex = servingSizesTypes.indexOf("100 g")
    const rightServingSizeTypeLink = servingSizesTypesLinks[rightServingSizeTypeIndex]

    await this.scrapper.finish()
    return rightServingSizeTypeLink
  }

  async getAllFoodsLinks() {
    try {
      const foodsCategoryLinks = await this.getFoodsCategoryLinks()
      const foodsCategoryNames = await this.getFoodsCategoryNames()

      for (const [foodsCategoryLinksIndex, foodCategoryLink] of foodsCategoryLinks.entries()) {
      const data: IFoodLinks = {} as IFoodLinks
      data.foodCategoryLink = foodCategoryLink
      data.categoryName = foodsCategoryNames[foodsCategoryLinksIndex]

      const foodsOverviewLinks = await this.getFoodsOverviewLinks(foodCategoryLink)
      const foodsNames = await this.getFoodsNames(foodCategoryLink)

      for (const [foodsOverviewLinksIndex, foodOverviewLink] of foodsOverviewLinks.entries()) {
        data.foodName = foodsNames[foodsOverviewLinksIndex]
        data.foodOverviewLink = foodOverviewLink

        const foodLink = await this.getFoodLink(foodOverviewLink)
        data.foodLink = foodLink

        const foodWithRightServingSize = await this.getFoodWithRightServingSizeLink(foodLink)
        data.foodWithRightServingSize = foodWithRightServingSize
        
        const foodLinks = new FoodLinks(data)
        this.foodsLinks.push(foodLinks)
        await this.db.writeData(this.foodsLinks)
      }
    }
    } 
    catch (error) {
      console.log("It was not possible to get your food links.")
    }
  }
}