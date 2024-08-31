import { ClientError } from "../errors/client-error";
import { dayjs } from "../lib/dayjs";
import { ProductRepository } from "../repositories/ProductRepository";

import customParse from 'dayjs/plugin/customParseFormat';
import { UserRepository } from "../repositories/userRepository";
import { ICompareDataChart, ICompareProductsController, IDatasetChart, IIdProductController } from "../interfaces/productInterface";

dayjs.extend(customParse)

class CompareProductsController implements ICompareProductsController{
    
    constructor(private idProductController: IIdProductController){}

    async compareProductsByAge(listId: string[]): Promise<ICompareDataChart>{
        let labels: string[] = [
            "3 - 6",
            "7 - 11",
            "12 - 18",
            "19 - 30",
            "31 - 50",
            "50 +"
	    ]
        
        let datasets: IDatasetChart[] = await Promise.all(listId.map(async (id) => {
            const { label, data } = await this.idProductController.dataProductGroupByAge(id);
            if (!label || !data) {
                throw new ClientError('Erro in the search of the product');
            }
            return { label, data };
        }));


        return {
            "labels": labels,
            "datasets": datasets
        }
    }

    async compareProductsByDate(listId: string[], date: Date): Promise<ICompareDataChart>{
        const { labels } = await this.idProductController.dataProductByLocale(listId[0]);

        let datasets: IDatasetChart[] = await Promise.all(listId.map(async (id) => {
            const { label, data } = await this.idProductController.seachProductByDate(id, date);
            if (!label || !data) {
                throw new ClientError('Erro in the search of the product');
            }
            return { label, data };
        }));

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
        
        // let datasets: IDatasetChart[] = []

        let datasets: IDatasetChart[] = await Promise.all(listId.map(async (id) => {
            const { label, data } = await this.idProductController.dataProductByGender(id);
            if (!label || !data) {
                throw new ClientError('Erro in the search of the product');
            }
            return { label, data };
        }));

        return {
            "labels": labels,
            "datasets": datasets
        }
    }

    async compareProductsByLocale(listId: string[]): Promise<ICompareDataChart>{
        const { labels } = await this.idProductController.dataProductByLocale(listId[0]);

        let datasets: IDatasetChart[] = await Promise.all(listId.map(async (id) => {
            const { label, data } = await this.idProductController.dataProductByLocale(id);
            if (!label || !data) {
                throw new ClientError('Erro in the search of the product');
            }
            return { label, data };
        }));

        return {
            "labels": labels,
            "datasets": datasets
        }
    }
}

export { CompareProductsController };
