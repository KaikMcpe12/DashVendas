import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { IdProductController } from "../controller/idProductController";
import { IdProductRepository } from "../repositories/idProductRepository";

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

        const idProductRepository = new IdProductRepository()

        let result;
        if(seachParam === 'age') {
            result = await idProductController.dataProductGroupByAge(id)
        } else if(seachParam === 'date'){
            result = await idProductRepository.idProductGroupByDate(id)
        } else if(seachParam === 'gender'){
            result = await idProductController.dataProductByGender(id)
        } else if(seachParam === 'locale'){
            result = await idProductController.dataProductByLocale(id)
        }

        return reply.status(201).send(result)
    })
}