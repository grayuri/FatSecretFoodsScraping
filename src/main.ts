import { Scrapper } from "./Arquitecture/Details/Scrapper"
import { FoodLinksGetter } from "./Arquitecture/Adapters/FoodLinksGetter"

async function init() {
  const S = new Scrapper()
  const FLG = new FoodLinksGetter(S)
  FLG.getAllFoodsLinks()
}

init()