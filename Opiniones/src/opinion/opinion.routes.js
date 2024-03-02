'use strict'

import Express from "express"
import { deleteComent, saveComent } from "./opinion.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"


const api = Express.Router()

api.post('/comentar', [validateJwt],saveComent)
api.delete('/eliminarComent/:id', [validateJwt], deleteComent)

export default api