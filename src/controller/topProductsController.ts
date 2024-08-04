import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { ProductRepository } from "../repositories/ProductRepository";
import { TopProductRepository } from "../repositories/topProductsRepository";

import customParse from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParse)

class TopProductsController{
    private topProductsRepository;
    private productRepository;
    
    constructor(){
        this.topProductsRepository = new TopProductRepository()
        this.productRepository = new ProductRepository()
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

}

export { TopProductsController }