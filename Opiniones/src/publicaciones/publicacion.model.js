'use strict'

import { Schema, model } from 'mongoose'

const publicacionSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'categoria',
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('publicacion', publicacionSchema)