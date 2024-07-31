import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { IdProductController } from "../controller/idProductController";

export async function idProductRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get<{ Params: { id: string, seachParam: string } }>('/graph/:id/:seachParam', {
        schema: {
            params: z.object({
                id: z.string(),
                seachParam: z.string(),
            })
        }
    },async (req, reply) => {
        const { id, seachParam } = req.params;

        const idProductController = new IdProductController()

        let result;
        if(seachParam === 'age') {
            result = await idProductController.seachProductGroupByAge(id)
        }

        return reply.status(201).send(result)
    })
}