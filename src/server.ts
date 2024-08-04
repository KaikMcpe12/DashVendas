import { fastify, FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { idProductByAgeRoute } from './routes/idProduct/idProductByAgeRoutes'
import { helloWorld } from './routes/helloworld'
import { idProductByDateRoute } from './routes/idProduct/idProductByDateRoutes'
import { idProductByGenderRoute } from './routes/idProduct/idProductByGenderRoutes'
import { idProductByLocaleRoute } from './routes/idProduct/idProductByLocaleRoutes'

const app: FastifyInstance = fastify()

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
    origin: '*',
})

app.register(helloWorld)

app.register(idProductByAgeRoute)
app.register(idProductByDateRoute)
app.register(idProductByGenderRoute)
app.register(idProductByLocaleRoute)

app.listen({ port: env.PORT }, (err) => {
    console.log(err)
    console.log('Server is running')
})