export interface ILocale{
    locale: string,
}

export interface IUserRepository{
    listAllLocale(): Promise<ILocale[]>
    findLocaleByName(name: string): Promise<ILocale | null>
}