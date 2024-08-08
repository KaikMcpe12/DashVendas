import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { ProductRepository } from "../repositories/ProductRepository";

import customParse from 'dayjs/plugin/customParseFormat';
import { UserRepository } from "../repositories/userRepository";
import { ICompareDataChart, ICompareProductsController, IDatasetChart, IIdProductController } from "../interfaces/productInterface";

dayjs.extend(customParse)

class CompareProductsController implements ICompareProductsController{
    private productRepository;
    private userRepository;
    
    constructor(private idProductController: IIdProductController){
        this.productRepository = new ProductRepository()
        this.userRepository = new UserRepository()
    }

    async compareProductsByAge(listId: string[]): Promise<ICompareDataChart>{
        let labels: string[] = [
            "3 - 6",
            "7 - 11",
            "12 - 18",
            "19 - 30",
            "31 - 50",
            "50 +"
	    ]
        
        let datasets: IDatasetChart[] = []
        
        await Promise.all(listId.map(async (id) => {
            const pr = await this.idProductController.dataProductGroupByAge(id)
            console.log(pr)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            datasets.push({
                label: pr.label,
                data: pr.data,
            })
        }))


        return {
            "labels": labels,
            "datasets": datasets
        }
    }

    async compareProductsByDate(listId: string[], date: Date): Promise<ICompareDataChart>{
        let labels: string[] = []
        
        let datasets: IDatasetChart[] = []
        
        await Promise.all(listId.map(async (id) => {
            const pr = await this.idProductController.seachProductByDate(id, date)
            console.log(pr)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels = pr.labels
            datasets.push({
                label: pr.label,
                data: pr.data,
            })
        }))


        return {
            "labels": labels,
            "datasets": datasets
        }
    }

    async compareProductsByGender(listId: string[]): Promise<ICompareDataChart>{
        let labels: string[] = [
            "Masculino",
            "Feminino"
	    ]
        
        let datasets: IDatasetChart[] = []
        
        await Promise.all(listId.map(async (id) => {
            const pr = await this.idProductController.dataProductByGender(id)
            console.log(pr)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            datasets.push({
                label: pr.label,
                data: pr.data,
            })
        }))


        return {
            "labels": labels,
            "datasets": datasets
        }
    }

    async compareProductsByLocale(listId: string[]): Promise<ICompareDataChart>{
        let labels: string[] = []
        
        let datasets: IDatasetChart[] = []
        
        await Promise.all(listId.map(async (id) => {
            const pr = await this.idProductController.dataProductByLocale(id)
            console.log(pr)
            if(!pr){
                throw new ClientError('Erro in the seach of the product')
            }
            labels = pr.labels
            datasets.push({
                label: pr.label,
                data: pr.data,
            })
        }))

        return {
            "labels": labels,
            "datasets": datasets
        }
    }
}

export { CompareProductsController };
