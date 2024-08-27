import { Scrapper } from "./Arquitecture/Details/Scrapper"
import { Database } from "./Arquitecture/Details/Database"
import { FoodLinksGetter } from "./Arquitecture/Adapters/FoodLinksGetter"
import { FoodGetter } from "./Arquitecture/Adapters/FoodGetter"

async function init() {
  const scrapper = new Scrapper()
  const foodsLinksDb = new Database("foodsLinks")
  const foodsDb = new Database("foods")

  const FLG = new FoodLinksGetter({
    scrapper,
    db: foodsLinksDb
  })

  const FG = new FoodGetter({
    scrapper,
    foodsLinksDb,
    foodsDb
  })

  try {
    await FLG.getAllFoodsLinks()
    
    if (FLG.foodsLinks.length > 0) {
      // If the script ran once
      await FG.getAllFoodsFacts()
    }
    else {
      // If the script was stopped, check if the Foods Links Database have something inside him.
      const foodsLinksJson: any = await foodsLinksDb.getDatas()
      const foodsLinks = await JSON.parse(foodsLinksJson)
  
      if (foodsLinks.length > 0) {
        await FG.getAllFoodsFacts()
      }
    }
    
    console.log("Congratulations! All the data have been written in your databases.")
  } 
  catch (error) {
    console.log("It was not possible to extract the datas.")
  }
}

init()