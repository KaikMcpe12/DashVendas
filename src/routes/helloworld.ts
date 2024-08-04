import { FastifyInstance } from 'fastify'

export async function helloWorld(app:FastifyInstance){
    app.get('/hello', async (req, res) => {
        return res.send('Hello World')
    })
}