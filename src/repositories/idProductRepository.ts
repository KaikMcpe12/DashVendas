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

    async idProductGroupByDate(id: string): Promise<ISalesByProduct[]> {
        const data = await prisma.userHasProduct.groupBy({
            by: ["datePurchase"],
            where: {
                productId: id
            },
            _count: {
                _all: true
            }
        })

        return data.map((item) => {
            return {
                date: item.datePurchase,
                amount: item._count._all
            }
        }) 
    }

    async idProductGroupByGender(id: string): Promise<ISalesByProduct[]> {
        const data = await prisma.user.groupBy({
            by: ["gender"],
            where: {
                user_has_products: {
                    some:{
                        productId: id,
                    }
                }
            },
            _count: {
                _all: true,
            }
        })

        return data.map((item) => {
            return {
                gender: item.gender,
                amount: item._count._all
            }
        })
    }

    async idProductGroupByLocale(id: string): Promise<ISalesByProduct[]> {
        const data = await prisma.user.groupBy({
            by: ["locale"],
            where: {
                user_has_products: {
                    some: {
                        productId: id
                    }
                }
            },
            _count: {
                _all: true
            },
            orderBy: {
                _count: {
                    id: "desc"
                }
            },
            take: 10
        })

        return data.map((item) => {
            return {
                locale: item.locale,
                amount: item._count._all
            }
        })
    }
}

export { IdProductRepository }