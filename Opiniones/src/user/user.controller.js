'use strict'

import User from './user.model.js'
import { checkPassword, encrypt } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'
import userModel from './user.model.js'

export const test = (req, res)=>{
    return res.send('holap :b')
}

export const register = async(req, res)=>{ 
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'Se registro exitosamente'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'error al registrar', err})
    }
}

export const login = async(req,res)=>{
    try {
        let {email,username,password}= req.body
        let user = await userModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(user && await checkPassword(password,user.password)){
            let usuarioLogeado = {
                uid: user._id,
                username: user.username,
                name: user.name
            }
            let token = await generateJwt(usuarioLogeado)
            return res.send({message: `Bienvenido ${user.name}`,
            usuarioLogeado,
            token
        })
        }
        return res.status(404).send({message: 'Contraseña o usuario incorrecto'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Fallo al iniciar sesion'})
    }
}

export const update = async(req,res)=>{
    try {
        let {id} = req.user
        let {uid} = req.params
        let data = req.body
        let user = await userModel.findOne({_id: id})
        if(id === uid){
            if(await checkPassword(data.oldpassword,user.password)){
                let updateUser = await userModel.findOneAndUpdate(
                    {_id:uid},
                    data,
                    {new: true}
                )
                if(!updateUser) return res.status(401).send({message: 'El usuario no se pudo actualizar'})
                return res.send({message: 'Actualizado',updateUser})
            }else{
                return res.status(404).send({message:'La contraseña antigua no conside'})
            }
            }else{
                return res.status(404).send({message:'No se puede actualizar una cuenta que no es tuya'})
            }

    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message:`El usuario ya existe ${err.keyValue.username}`})
        return res.status(500).send({message: 'Error al actualizar'})
    }
}