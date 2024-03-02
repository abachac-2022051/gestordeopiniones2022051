'use strict'

import express from 'express'
import { savePubli, test, updatePubli } from './publicacion.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/guardar', [validateJwt],savePubli)

api.put('/actualizar/:uid', [validateJwt], updatePubli)

export default api