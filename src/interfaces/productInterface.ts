export interface IProduct{
    id: string;
    name: string;
    price: number;
    type: string;
}

export interface ISalesByProduct{
    dateBirth?: Date;
    gender?: string;
    locale?: string;
    date?: Date;
    amount: number;
}

export interface ITopSales{
    productId: string;
    amount: number;
}

export interface IProductRepository{
    listAllProducts(): Promise<IProduct[]>;
    findProductById(id: string): Promise<IProduct | null>;
    listAllType(): Promise<Object[]>;
    findTypeByName(name: string): Promise<IProduct | null>;
}

export interface IidProductRepository{
    idProductGroupByAge(id: string): Promise<ISalesByProduct[]>;
    idProductGroupByDate(id: string): Promise<ISalesByProduct[]>;
    idProductGroupByGender(id: string): Promise<ISalesByProduct[]>;
    idProductGroupByLocale(id: string): Promise<ISalesByProduct[]>;
}

export interface ICompareProductRepository{
    compareProductGroupByAge(name: string[]): Promise<ISalesByProduct[]>;
    compareProductGroupByGender(name: string[]): Promise<ISalesByProduct[]>;
    compareProductGroupByLocale(name: string[]): Promise<ISalesByProduct[]>;
    compareProductGroupByDate(name: string[]): Promise<ISalesByProduct[]>;
}

export interface ITopProductRepository{
    topProductsByAge(minDate: Date, maxDate: Date): Promise<ITopSales[]>;
    topProductsByAmount(): Promise<ITopSales[]>;
    topProductsByGender(gender: string): Promise<ITopSales[]>;
    topProductsByLocale(locale: string): Promise<ITopSales[]>;
    topProductsByDate(minDate: Date, maxDate: Date): Promise<ITopSales[]>;
    topProductsByType(type: string): Promise<ITopSales[]>;
    topProductsByPrice(minPrice: number, maxPrice: number): Promise<ITopSales[]>;
    topProductsByReview(rating: number): Promise<ITopSales[]>;
}
