import { fastify, FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { idProductRoute } from './routes/idProductRoutes'
import { helloWorld } from './routes/helloworld'

const app: FastifyInstance = fastify()

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(idProductRoute)
app.register(helloWorld)

app.listen({ port: env.PORT }, (err) => {
    console.log(err)
    console.log('Server is running')
})