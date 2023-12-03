import express from 'express'
import dotenv from 'dotenv'
import { MongoConnection } from './database/MongoConnect'
import { userRoutes } from './modules/user/routes/userRoutes'

dotenv.config()
MongoConnection.initialize()

const app = express()
app.use(express.json())
app.use(userRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))