import express from 'express'
import dotenv from 'dotenv'
import { MongoConnection } from './database/MongoConnect'
import { routes } from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './utils/swagger/swagger'

dotenv.config()
MongoConnection.initialize()

const app = express()
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use(routes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))