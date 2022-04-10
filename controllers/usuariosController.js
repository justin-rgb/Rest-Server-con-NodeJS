const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        "ok": true,
        q,
        nombre,
        apikey
    })
}

const usuariosPost = (req, res = response) =>{
    
    const body = req.body;

    res.json({
        "ok": true,
        "body": body
    })

}

const usuariosDelete = (req, res = response) =>{
    res.json({
        "ok": true,
        "msg": "delete"
    })
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost
}