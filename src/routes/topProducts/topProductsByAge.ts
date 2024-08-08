import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByAgeRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { minAge: number, maxAge: number } }>('/graph/top/age', {
        schema: {
            body: z.object({
                minAge: z.coerce.number(),
                maxAge: z.coerce.number(),
            })
        }
    },async (req, reply) => {
        const { minAge, maxAge } = req.body;

        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByAge(minAge, maxAge)
        
        return reply.status(201).send(result)
    })
}