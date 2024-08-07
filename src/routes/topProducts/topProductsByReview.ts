import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByReviewRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { rating: number } }>('/graph/top/review', {
        schema: {
            body: z.object({
                rating: z.coerce.number(),
            })
        }
    },async (req, reply) => {
        const { rating } = req.body;
        
        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByReview(rating)
        
        return reply.status(201).send(result)
    })
}