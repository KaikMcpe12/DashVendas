import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { ProductRepository } from "../repositories/ProductRepository";

import customParse from 'dayjs/plugin/customParseFormat';
import { UserRepository } from "../repositories/userRepository";
import { IIdProductController } from "../interfaces/productInterface";

dayjs.extend(customParse)

class CompareProductsController{
    private productRepository;
    private userRepository;
    
    constructor(private idProductController: IIdProductController){
        this.productRepository = new ProductRepository()
        this.userRepository = new UserRepository()
    }

    async compareProductsByAge(listId: string[]){
        let labels: string[] = [
            "3 - 6",
            "7 - 11",
            "12 - 18",
            "19 - 30",
            "31 - 50",
            "50 +"
	    ]
        
        let listLabel: string[] = []
        let data: (string[] | number[])[] = []
        
        await Promise.all(listId.map(async (id) => {
            const pr = await this.idProductController.dataProductGroupByAge(id)
            console.log(pr)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            listLabel.push(pr.label)
            data.push(pr.data)
        }))


        return {
            "labels": labels,
            "label": listLabel,
            "data": data
        }
    }
}

export { CompareProductsController };
