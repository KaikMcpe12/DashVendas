import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByTypeRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { type: string } }>('/graph/top/type', {
        schema: {
            body: z.object({
                type: z.string(),
            })
        }
    },async (req, reply) => {
        const { type } = req.body;
        
        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByType(type)
        
        return reply.status(201).send(result)
    })
}