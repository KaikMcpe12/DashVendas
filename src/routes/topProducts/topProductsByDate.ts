import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByDateRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { minDate: Date, maxDate: Date } }>('/graph/top/date', {
        schema: {
            body: z.object({
                minDate: z.coerce.date(),
                maxDate: z.coerce.date(),
            })
        }
    },async (req, reply) => {
        const { minDate, maxDate } = req.body;
        console.log(minDate)
        console.log(maxDate)

        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByDate(minDate, maxDate)
        
        return reply.status(201).send(result)
    })
}