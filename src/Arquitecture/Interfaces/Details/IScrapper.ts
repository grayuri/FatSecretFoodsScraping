export interface IScrapper {
  browser: any
  page: any
  start(): void
  finish(): void
  getElement(selector: string, property: string): Promise<string | undefined>
  getElements(selector: string, property: string): Promise<string[] | undefined>
  getAsyncElement(selector: string, property: string): Promise<string | undefined>
  getAsyncElements(selector: string, property: string): Promise<string[] | undefined>
  clickIt(element: any): void
  openPage(link: string): void
}