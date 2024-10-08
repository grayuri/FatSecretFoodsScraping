import { IFood } from "../Interfaces/Entities/IFood"

export class Food implements IFood{
  public name: string
  public category: string
  public calories: number
  public fat: number
  public carbs: number
  public protein: number
  public servingSizeGrams: number
  public slug: string
  public categorySlug: string

  constructor(data: IFood) {
    this.name = data.name
    this.category = data.category
    this.calories  = data.calories
    this.fat  = data.fat
    this.carbs  = data.carbs
    this.protein  = data.protein
    this.servingSizeGrams  = data.servingSizeGrams
    this.slug = data.name.toLowerCase().replaceAll(" ", "_")
    this.categorySlug = data.category.toLowerCase().replaceAll(" ", "_")
  }
}