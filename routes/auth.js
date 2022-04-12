const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[
    check('email', 'El Correo es obligatorio').isEmail(),
    check('password','La Contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login);


module.exports=router;