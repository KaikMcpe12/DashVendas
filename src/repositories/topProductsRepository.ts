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

        return topProducts.map(item => {
            return {
                productId: item.productId,
                amount: item._count._all
            }
        })
    }

    async topProductsByAmount(): Promise<ITopSales[]>{
      const topProducts = await prisma.userHasProduct.groupBy({
        by: ['productId'],
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }

    async topProductsByDate(minDate: Date, maxDate: Date): Promise<ITopSales[]> {
      const topProducts = await prisma.userHasProduct.groupBy({
        by: ['productId'],
        where: {
          datePurchase: {
            gte: minDate,
            lte: maxDate
          }
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }

    async topProductsByGender(gender: string): Promise<ITopSales[]> {
      const topProducts = await prisma.userHasProduct.groupBy({
        by: ['productId'],
        where: {
          user: {
            gender
          }
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }

    async topProductsByLocale(locale: string): Promise<ITopSales[]> {
      const topProducts = await prisma.userHasProduct.groupBy({
        by: ['productId'],
        where: {
          user: {
            locale
          }
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }

    async topProductsByPrice(minPrice: number, maxPrice: number): Promise<ITopSales[]> {
      const topProducts = await prisma.userHasProduct.groupBy({
        by: ['productId'],
        where: {
          product: {
            price: {
              gte: minPrice,
              lte: maxPrice
            }
          }
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }

    async topProductsByReview(rating: number): Promise<ITopSales[]> {
      const topProducts = await prisma.review.groupBy({
        by: ['productId'],
        where: {
          rating
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }

    async topProductsByType(type: string): Promise<ITopSales[]> {
      const topProducts = await prisma.userHasProduct.groupBy({
        by: ['productId'],
        where: {
          product: {
            type
          }
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            productId: 'desc',
          }
        },
        take: 10
      })

      return topProducts.map(item => {
        return {
          productId: item.productId,
          amount: item._count._all
        }
      })
    }
}

export { TopProductRepository };
