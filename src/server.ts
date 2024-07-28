import { fastify, FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'

const app: FastifyInstance = fastify()

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.listen({ port: env.PORT }, () => {
    console.log('Server is running')
})