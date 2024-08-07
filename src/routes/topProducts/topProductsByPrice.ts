import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByPriceRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { minPrice: number, maxPrice: number } }>('/graph/top/price', {
        schema: {
            body: z.object({
                minPrice: z.coerce.number(),
                maxPrice: z.coerce.number(),
            })
        }
    },async (req, reply) => {
        const { minPrice, maxPrice } = req.body;
        
        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByPrice(minPrice, maxPrice)
        
        return reply.status(201).send(result)
    })
}