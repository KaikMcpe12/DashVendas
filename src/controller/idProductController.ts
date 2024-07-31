import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { IdProductRepository } from "../repositories/idProductRepository";
import { ProductRepository } from "../repositories/ProductRepository";

class IdProductController{
    private idProductRepository;
    private productRepository;
    
    constructor(){
        this.idProductRepository = new IdProductRepository()
        this.productRepository = new ProductRepository()
    }

    async seachProductGroupByAge(id: string){
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
}

export { IdProductController }