import cors from '@fastify/cors'
import { fastify, FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { helloWorld } from './routes/helloworld'
import { idProductByAgeRoute } from './routes/idProduct/idProductByAgeRoutes'
import { idProductByDateRoute } from './routes/idProduct/idProductByDateRoutes'
import { idProductByGenderRoute } from './routes/idProduct/idProductByGenderRoutes'
import { idProductByLocaleRoute } from './routes/idProduct/idProductByLocaleRoutes'
import { topProductsByAgeRoute } from './routes/topProducts/topProductsByAgeRoutes'
import { topProductsByAmountRoute } from './routes/topProducts/topProductsByAmount'
import { topProductsByDateRoute } from './routes/topProducts/topProductsByDate'
import { topProductsByGenderRoute } from './routes/topProducts/topProductsByGender'
import { topProductsByLocaleRoute } from './routes/topProducts/topProductsByLocale'
import { topProductsByPriceRoute } from './routes/topProducts/topProductsByPrice'
import { topProductsByReviewRoute } from './routes/topProducts/topProductsByReview'
import { topProductsByTypeRoute } from './routes/topProducts/topProductsByType'

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

app.register(topProductsByAgeRoute)
app.register(topProductsByAmountRoute)
app.register(topProductsByDateRoute)
app.register(topProductsByGenderRoute)
app.register(topProductsByLocaleRoute)
app.register(topProductsByPriceRoute)
app.register(topProductsByReviewRoute)
app.register(topProductsByTypeRoute)

app.listen({ port: env.PORT }, (err) => {
    console.log(err)
    console.log('Server is running')
})