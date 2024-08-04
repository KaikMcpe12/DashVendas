import dayjs from "dayjs";
import { ITopProductRepository, ITopSales } from "../interfaces/productInterface";
import { prisma } from "../lib/prisma";

class TopProductRepository implements ITopProductRepository{
    async topProductsByAge(minDate: Date, maxDate: Date): Promise<ITopSales[]>{
        const topProducts = await prisma.userHasProduct.groupBy({
            by: ['productId'],
            where: {
              user: {
                dateBirth: {
                  gte: minDate,
                  lte: maxDate,
                },
              },
            },
            _count: {
              _all: true,
            },
            orderBy: {
              _count: {
                productId: 'desc',
              },
            },
            take: 10,
          });

        return topProducts.map((item) => {
            return {
                productId: item.productId,
                amount: item._count._all
            }
        })
    }
}

export { TopProductRepository }