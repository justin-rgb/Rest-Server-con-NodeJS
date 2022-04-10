const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosDelete } = require('../controllers/usuariosController');
const router = Router();

router.get('/', usuariosGet)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

module.exports=router;