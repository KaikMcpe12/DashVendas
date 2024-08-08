import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CompareProductsController } from "../../controller/compareProductsController";
import { IdProductController } from "../../controller/idProductController";

export async function compareProductsByGenderRoute(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{ Body: { products: string[] } }>('/graph/compare/gender', {
        schema: {
            body: z.object({
                products: z.string().array(),
            })
        }
    },async (req, reply) => {
        const { products } = req.body;
        console.log(products)
        
        const idProductController = new IdProductController()
        const compareProductsController = new CompareProductsController(idProductController)

        const result = await compareProductsController.compareProductsByGender(products)
        
        return reply.status(201).send(result)
    })
}