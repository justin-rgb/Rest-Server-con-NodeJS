const { response, json } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ email })
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario o Password incorrecto - correo'
            })
        }
        //Si el usuario esta activo
        if( !usuario.state ){
            return res.status(400).json({
                msg: 'Usuario o Password incorrecto - estado false'
            })
        }
        //Verificar la contrasena
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario o Password incorrecto - password'
            })
        }
        //Generar el jwt
        const token = await generarJWT( usuario.id, usuario.name, usuario.email );

        res.json({
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


const googleSignIn = async(req, res = response) =>{

    const { id_token } = req.body;

    try{
        const { correo: email, nombre: name, img } = await googleVerify(id_token); 
        let usuario = await Usuario.findOne({ email });

        if( !usuario ){
            const data ={
                name,
                email,
                password: ':P',
                img,
                google: true,
                role: 'USER_ROLE'
            };
            usuario = new Usuario( data );
            await usuario.save();
        }

        if( !usuario.state ){
            return res.status(401).json({
                msg: 'Su usuario ha sido bloqueado, contacte al administrador'
            })
        }
        const token = await generarJWT( usuario.id, usuario.name, usuario.email );

        res.json({
            ok: true,
            usuario,
            token
        })
    }catch(error){
        res.status(400).json({
            ok: false,
            msg: 'Ha ocurrido un error con el Token'
        })
    }

}


module.exports = {
    login,
    googleSignIn
}