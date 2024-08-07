import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { ProductRepository } from "../repositories/ProductRepository";
import { TopProductRepository } from "../repositories/topProductsRepository";

import customParse from 'dayjs/plugin/customParseFormat';
import { UserRepository } from "../repositories/userRepository";

dayjs.extend(customParse)

class TopProductsController{
    private topProductsRepository;
    private productRepository;
    private userRepository;
    
    constructor(){
        this.topProductsRepository = new TopProductRepository()
        this.productRepository = new ProductRepository()
        this.userRepository = new UserRepository()
    }

    async topProductsByAge(minAge: number, maxAge: number){
        const [maxDate, minDate] = [dayjs().subtract(minAge,'y').toDate(), dayjs().subtract(maxAge, 'y').toDate()]

        const topProducts = await this.topProductsRepository.topProductsByAge(minDate, maxDate)

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))


        return {
            "labels": labels,
            "label": `${minAge} - ${maxAge}`,
            "data": data
        }
    }

    async topProductsByAmount(){
        const topProducts = await this.topProductsRepository.topProductsByAmount()

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))


        return {
            "labels": labels,
            "label": `Amount`,
            "data": data
        }
    }

    async topProductsByDate(minDate: Date, maxDate: Date){
        const topProducts = await this.topProductsRepository.topProductsByDate(minDate, maxDate)
        
        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))

        return {
            "labels": labels,
            "label": `${dayjs(minDate).format('DD/MMM/YYYY')} - ${dayjs(maxDate).format('DD/MMM/YYYY')}`,
            "data": data
        }
    }

    async topProductsByGender(gender: string){
        const topProducts = await this.topProductsRepository.topProductsByGender(gender)

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))


        return {
            "labels": labels,
            "label": gender,
            "data": data
        }
    }

    async topProductsByLocale(locale: string){
        const localeIfExist = await this.userRepository.findLocaleByName(locale)

        if(!localeIfExist){
            throw new ClientError('Locale not found')
        }

        const topProducts = await this.topProductsRepository.topProductsByLocale(locale)

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))

        return {
            "labels": labels,
            "label": locale,
            "data": data
        }
    }

    async topProductsByPrice(minPrice: number, maxPrice: number){
        const topProducts = await this.topProductsRepository.topProductsByPrice(minPrice, maxPrice)

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))

        return {
            "labels": labels,
            "label": `${minPrice} - ${maxPrice}`,
            "data": data
        }
    }

    async topProductsByReview(rating: number){
        if(rating < 0 || rating > 5){
            throw new ClientError('Rating invalid')
        }

        const topProducts = await this.topProductsRepository.topProductsByReview(rating)

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))

        return {
            "labels": labels,
            "label": `${rating} Stars`,
            "data": data
        }
    }

    async topProductsByType(type: string){
        const typeIfExist = await this.productRepository.findTypeByName(type)

        if(!typeIfExist){
            throw new ClientError('Type not found')
        }

        const topProducts = await this.topProductsRepository.topProductsByType(type)

        let labels: string[] = []
        let data: number[] = []

        await Promise.all(topProducts.map(async (product) => {
            const pr = await this.productRepository.findProductById(product.productId)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels.push(pr.name)
            data.push(product.amount)
        }))

        return {
            "labels": labels,
            "label": type,
            "data": data
        }
    }

}

export { TopProductsController }