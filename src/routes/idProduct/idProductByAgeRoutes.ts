import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { IdProductController } from "../../controller/idProductController";

export async function idProductByAgeRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get<{ Params: { id: string } }>('/graph/:id/age', {
        schema: {
            params: z.object({
                id: z.string(),
            })
        }
    },async (req, reply) => {
        const { id } = req.params;

        const idProductController = new IdProductController()

        const result = await idProductController.dataProductGroupByAge(id)

        return reply.status(201).send(result)
    })
}