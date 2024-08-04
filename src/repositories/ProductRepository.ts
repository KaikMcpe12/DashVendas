import { IProduct, IProductRepository } from "../interfaces/productInterface";
import { prisma } from "../lib/prisma";

class ProductRepository implements IProductRepository{
    async listAllProducts(): Promise<IProduct[]> {
        const data = await prisma.product.findMany()

        return data
    }

    async findProductById(id: string): Promise<IProduct | null>{
        const data = await prisma.product.findFirst({
            where: {
                id
            }
        })

        return data 
    }
}

export { ProductRepository }