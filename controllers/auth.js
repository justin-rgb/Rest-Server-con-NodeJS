const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJwt");

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


module.exports = {
    login
}