export interface IDatabase {
  databasePath: string
  getDatas(): Promise<any[]>
  getData(dataProperty: string, dataFilter: string): Promise<any>
  writeData(data: any): void
}