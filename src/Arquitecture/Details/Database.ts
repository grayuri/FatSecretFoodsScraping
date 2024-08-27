import path from "path"
import syncFs from "fs"
import fs from "fs/promises"
import { IDatabase } from "../Interfaces/Details/IDatabase"

export class Database implements IDatabase {
  databasePath: string
  
  constructor(databaseName: string) {
    this.databasePath = path.join(process.cwd(), "data", `${databaseName}.json`)
    this.createDatabaseIfNotExists()
  }

  private createDatabaseIfNotExists() {
    const directoryPath = path.join(process.cwd(), "data")

    if (!syncFs.existsSync(directoryPath)) {
      syncFs.mkdirSync(directoryPath)
      syncFs.writeFileSync(this.databasePath, "[]")
    }
  }

  async getDatas(): Promise<any[]> {
    let datas

    try {
      const datasJson: any = await fs.readFile(this.databasePath, "utf-8")
      const stringfiedDatasJson: string = JSON.stringify(datasJson)
      datas = await JSON.parse(stringfiedDatasJson)
    } 
    catch (error) {
      console.log("It was not possible to get your data.")
    }

    return datas
  }

  async getData(dataProperty: string, dataFilter: string): Promise<any> {
    let data

    try {
      const datasJson: any = await fs.readFile(this.databasePath, "utf-8")
      const stringfiedDatasJson: string = JSON.stringify(datasJson)
      const datas = await JSON.parse(stringfiedDatasJson)
      data = datas.find((data: any) => data[dataProperty] === dataFilter)
    } 
    catch (error) {
      console.log("It was not possible to get your data.")
    }

    return data
  }

  async writeData(data: any) {
    try {
      await fs.writeFile(this.databasePath, JSON.stringify(data), "utf-8")
      console.log("Your data was written succefully!")
    } 
    catch (error) {
      console.log("It was not possible to write your data.")
    }
  }
}