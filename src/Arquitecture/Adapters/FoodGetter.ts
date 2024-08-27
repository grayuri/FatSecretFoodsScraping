import { Food } from "../Entities/Food";
import { IFood } from "../Interfaces/Entities/IFood";
import { IFoodGetter } from "../Interfaces/Adapters/IFoodGetter";

interface constructorProps {
  scrapper: any
  foodsLinksDb: any
  foodsDb: any
}

export class FoodGetter implements IFoodGetter {
  private scrapper: any
  private foodsDb: any
  private foodsLinksDb: any
  public foods: IFood[]

  constructor({ scrapper, foodsLinksDb, foodsDb }: constructorProps) {
    this.scrapper = scrapper
    this.foodsLinksDb = foodsLinksDb
    this.foodsDb = foodsDb
    this.foods = []
  }

  async getFoodFacts(foodLink: string, name: string, category: string): Promise<IFood> {
    let foodFacts: IFood = {} as IFood;

    try {
      await this.scrapper.start()
      await this.scrapper.openPage(foodLink)
      
      const factsTitlesSelector = "div.factPanel>table>tbody>tr>td.fact>.factTitle"
      const factsValuesSelector = "div.factPanel>table>tbody>tr>td.fact>.factValue"
      const factsTitles = await this.scrapper.getElements(factsTitlesSelector, "innerText")
      const factsValues = await this.scrapper.getElements(factsValuesSelector, "innerText")
  
      const data: any = {} as any
  
      factsTitles.forEach((title: string, index: number) => {
        data[title.toLowerCase()] = Number(parseFloat(factsValues[index]).toFixed(2))
      })
  
      foodFacts = new Food({ 
        ...data,
        name,
        category,
        servingSizeGrams: 100
      })
  
      await this.scrapper.finish()
    }
    catch(error) {
      console.log("It was not possible to get the ", name, " data.")
    }

    return foodFacts
  }

  async getAllFoodsFacts() {
    try {
      const foodsLinksJson = await this.foodsLinksDb.getDatas()
      const foodsLinks = await JSON.parse(foodsLinksJson)
      
      for (const foodLink of foodsLinks) {
        if (foodLink.foodWithRightServingSize) {
          const food = await this.getFoodFacts(
            foodLink.foodWithRightServingSize,
            foodLink.foodName,
            foodLink.categoryName
          )
          this.foods.push(food)
          await this.foodsDb.writeData(this.foods)
        }
      }
    } 
    catch (error) {
      console.log("It was not possible to get your food facts.")
    }
  }
}