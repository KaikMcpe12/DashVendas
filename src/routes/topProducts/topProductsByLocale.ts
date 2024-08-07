import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByLocaleRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { locale: string } }>('/graph/top/locale', {
        schema: {
            body: z.object({
                locale: z.string()
            })
        }
    },async (req, reply) => {
        const { locale } = req.body;
        
        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByLocale(locale)
        
        return reply.status(201).send(result)
    })
}