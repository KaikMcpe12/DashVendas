import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { IdProductController } from "../../controller/idProductController";

export async function idProductByGenderRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get<{ Params: { id: string } }>('/graph/id/:id/gender', {
        schema: {
            params: z.object({
                id: z.string(),
            })
        }
    },async (req, reply) => {
        const { id } = req.params;

        const idProductController = new IdProductController()

        const result = await idProductController.dataProductByGender(id)

        return reply.status(201).send(result)
    })
}