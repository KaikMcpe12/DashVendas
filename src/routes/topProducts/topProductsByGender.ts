import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByGenderRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { gender: string } }>('/graph/top/gender', {
        schema: {
            body: z.object({
                gender: z.string()
            })
        }
    },async (req, reply) => {
        const { gender } = req.body;
        
        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByGender(gender === 'M' ? 'Masculino' : 'Feminino')
        
        return reply.status(201).send(result)
    })
}