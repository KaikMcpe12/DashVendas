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

    async listAllType(): Promise<object[]> {
        const data = await prisma.product.findMany({
            select: {
                type: true
            }
        })

        return data
    }

    async findTypeByName(type: string): Promise<IProduct | null>{
        const data = await prisma.product.findFirst({
            where: {
                type
            }
        })

        return data
    }
}

export { ProductRepository }