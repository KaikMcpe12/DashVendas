import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { IdProductRepository } from "../repositories/idProductRepository";
import { ProductRepository } from "../repositories/ProductRepository";

import customParse from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParse)

class IdProductController{
    private idProductRepository;
    private productRepository;
    
    constructor(){
        this.idProductRepository = new IdProductRepository()
        this.productRepository = new ProductRepository()
    }

    async dataProductGroupByAge(id: string){
        const product = await this.productRepository.findProductById(id)

        if(!product){
            throw new ClientError('Product not exist')
        }

        const salesProduct = await this.idProductRepository.idProductGroupByAge(id)

        const intervalAge = [[3,6], [7,11], [12,18], [19,30], [31,50]]

        let ages: number[] = []
        salesProduct.forEach((data) => {
            const age = dayjs().diff(data.dateBirth, 'year');
            for (let i = 0; i < data.amount; i++) {
              ages.push(age);
            }
        })

        let groupByAge = [0,0,0,0,0,0]
        ages.forEach((age) => {
            const index = intervalAge.findIndex(([min, max]) => age >= min && age <= max);
            if (index === -1) {
                groupByAge[groupByAge.length - 1] += 1; // Fora dos intervalos
            } else {
                groupByAge[index] += 1;
            }
        })
        
        return {
            "labels": ['3 - 6', '7 - 11', '12 - 18', '19 - 30', '31 - 50', '50 +'],
            "label": product.name,
            "data": groupByAge
        }
    }

    async seachProductByDate(id: string, date: Date){
        const product = await this.productRepository.findProductById(id)

        if(!product){
            throw new ClientError('Product not exist')
        }

        const salesProduct = await this.idProductRepository.idProductGroupByDate(id)

        //trabalhar com o formato 2024/06
        // MMM/YY -> YYYY = mostra os meses do ano
        // DD/MMM/YY -> MM/YYYY = mostra os dias do ano
        // else -> null = 10 anos atrasados

        let labels: string[] = []
        let data: number[] = []

        if(dayjs(date, 'YYYY', true).isValid()){
            labels = Array.from({ length: 12 }, (_, i) => dayjs(`${date}`).add(i, 'month').format('MMM/YYYY'))
            data = new Array(12).fill(0)
            const year = dayjs(date).year()
    
            salesProduct.forEach((item) => {
                const saleDate = dayjs(item.date)
                if (saleDate.year() === year) {
                    const monthIndex = saleDate.month()
                    data[monthIndex] += 1 * item.amount
                }
            })
        } else if (dayjs(date, 'MM/YYYY', true).isValid()){
            const monthYear = dayjs(date, 'MM/YYYY')
            const daysInMonth = monthYear.daysInMonth()
            labels = Array.from({ length: daysInMonth }, (_, i) => monthYear.add(i,'day').format('DD/MM/YY'))

            data = new Array(daysInMonth).fill(0)

            salesProduct.forEach((item) => {
                const saleDate = dayjs(item.date);
                if (saleDate.year() === monthYear.year() && saleDate.month() === monthYear.month()) {
                    const dayIndex = saleDate.date() - 1
                    data[dayIndex] += 1 * item.amount
                }
            });
        } else {
            const actualYear = dayjs().year()
            const startYear = actualYear - 9
            labels = Array.from({ length: 10 }, (_, i) => (startYear + i).toString())
            data = new Array(10).fill(0)
            
            salesProduct.forEach((item) => {
                const saleDate = dayjs(item.date).year()
                if (saleDate >= startYear) {
                    const yearIndex = saleDate - startYear
                    data[yearIndex] += 1 * item.amount
                }
            })
        }

        return {
            "labels": labels,
            "label": product.name,
            "data": data
        }
    }

    async dataProductByGender(id: string){
        const product = await this.productRepository.findProductById(id)

        if(!product){
            throw new ClientError('Product not exist')
        }

        const salesProduct = await this.idProductRepository.idProductGroupByGender(id)

        let labels: string[] = []
        let data: number[] = []

        salesProduct.forEach((item) => {
            labels.push(item.gender as string)
            data.push(item.amount)
        })

        return {
            "labels": labels,
            "label": product.name,
            "data": data
        }
    }

    async dataProductByLocale(id: string){
        const product = await this.productRepository.findProductById(id)

        if(!product){
            throw new ClientError('Product not exist')
        }

        const salesProduct = await this.idProductRepository.idProductGroupByLocale(id)

        let labels: string[] = []
        let data: number[] = []

        salesProduct.forEach((item) => {
            labels.push(item.locale as string)
            data.push(item.amount)
        })

        return {
            "labels": labels,
            "label": product.name,
            "data": data
        }
    }
}

export { IdProductController };
