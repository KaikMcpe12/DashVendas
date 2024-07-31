import { IidProductRepository, ISalesByProduct } from "../interfaces/productInterface";
import { prisma } from "../lib/prisma";

class IdProductRepository implements IidProductRepository{
    async idProductGroupByAge(id: string): Promise<ISalesByProduct[]>{
        const data = await prisma.user.groupBy({
            by: ["dateBirth"],
            where:{
                user_has_products: {
                    some:{
                        productId: id,
                    },
                },
            },
            _count: {
                _all: true
            }
        })

        return data.map(item => {
            return {
                dateBirth: item.dateBirth,
                amount: item._count._all
            }
        })
    }

    // idProductGroupByDate(id: string): Promise<ISalesByProduct[]> {
        
    // }

    // idProductGroupByGender(id: string): Promise<ISalesByProduct[]> {
        
    // }

    // idProductGroupByLocale(id: string): Promise<ISalesByProduct[]> {
        
    // }
}

export { IdProductRepository }