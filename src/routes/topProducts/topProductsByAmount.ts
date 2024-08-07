import { FastifyInstance } from "fastify";
import { TopProductsController } from "../../controller/topProductsController";

export async function topProductsByAmountRoute(app: FastifyInstance){
    app.post('/graph/top/amount',async (req, reply) => {
        const topProductsController = new TopProductsController()

        const result = await topProductsController.topProductsByAmount()
        
        return reply.status(201).send(result)
    })
}