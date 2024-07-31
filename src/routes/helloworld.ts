import { FastifyInstance } from 'fastify'

export async function helloWorld(app:FastifyInstance){
    app.get('/', async (req, res) => {
        return res.send('Hello World')
    })
}