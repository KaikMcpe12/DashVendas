import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CompareProductsController } from "../../controller/compareProductsController";
import { IdProductController } from "../../controller/idProductController";

export async function compareProductsByDateRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { products: string[], date: Date } }>('/graph/compare/date', {
        schema: {
            body: z.object({
                products: z.string().array(),
                date: z.string()
            })
        }
    },async (req, reply) => {
        const { products, date } = req.body;
        console.log(products)
        
        const idProductController = new IdProductController()
        const compareProductsController = new CompareProductsController(idProductController)

        const result = await compareProductsController.compareProductsByDate(products, date)
        
        return reply.status(201).send(result)
    })
}