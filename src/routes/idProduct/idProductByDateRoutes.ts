import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { IdProductController } from "../../controller/idProductController";

export async function idProductByDateRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Params: { id: string }, Body: { date: Date } }>('/graph/:id/date', {
        schema: {
            params: z.object({
                id: z.string(),
            }),
            body: z.object({
                date: z.string(),
            })
        }
    },async (req, reply) => {
        const { id } = req.params;
        const { date } = req.body

        const idProductController = new IdProductController()

        const result = await idProductController.seachProductByDate(id, date)

        return reply.status(201).send(result)
    })
}