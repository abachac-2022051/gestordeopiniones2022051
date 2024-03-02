'use strict'

import { Schema, model } from 'mongoose'

const opinionSchema = Schema({
    comentario: {
        type: String,
        required: true
    },
    publicacion: {
        type: Schema.ObjectId,
        ref: 'publicacion',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('opinion',opinionSchema)