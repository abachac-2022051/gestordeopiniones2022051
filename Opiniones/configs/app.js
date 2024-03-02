import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import publicacionRoutes from '../src/publicaciones/publicacion.routes.js'
import categoriaRoutes from '../src/categoria/categoria.routes.js'
import opinionRoutes from '../src/opinion/opinion.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use(userRoutes)
app.use('/publicacion', publicacionRoutes)
app.use(categoriaRoutes)
app.use('/opinion', opinionRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}