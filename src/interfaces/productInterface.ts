export interface IProduct{
    id: string;
    name: string;
    price: number;
    type: string;
}

export interface ISalesByProduct{
    name: string;
    age?: number;
    gender?: string;
    locale?: string;
    date?: Date;
    amount: number;
}

export interface ITopSales{
    name: string;
    age?: number;
    gender?: string;
    locale?: string;
    type?: string;
    price?: string;
    review?: number;
    amount: number;
}

export interface IProductRepository{
    listAllProducts(): Promise<IProduct[]>;
}

export interface IidProductRepository{
    idProductGroupByAge(id: string): Promise<ISalesByProduct[]>;
    idProductGroupByGender(id: string): Promise<ISalesByProduct[]>;
    idProductGroupByLocale(id: string): Promise<ISalesByProduct[]>;
    idProductGroupByDate(id: string): Promise<ISalesByProduct[]>;
}

export interface ICompareProductRepository{
    compareProductGroupByAge(name: string[]): Promise<ISalesByProduct[]>;
    compareProductGroupByGender(name: string[]): Promise<ISalesByProduct[]>;
    compareProductGroupByLocale(name: string[]): Promise<ISalesByProduct[]>;
    compareProductGroupByDate(name: string[]): Promise<ISalesByProduct[]>;
}

export interface ITopProductRepository{
    topProductGroupByAge(minAge: number, maxAge: number): Promise<ITopSales[]>;
    topProductGroupByGender(gender: string): Promise<ITopSales[]>;
    topProductGroupByLocale(locale: string): Promise<ITopSales[]>;
    topProductGroupByDate(date: Date): Promise<ITopSales[]>;
    topProductGroupByType(type: string): Promise<ITopSales[]>;
    topProductGroupByPrice(type: string): Promise<ITopSales[]>;
    topProductGroupByReview(type: string): Promise<ITopSales[]>;
}
