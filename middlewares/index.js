

const validarJWT = require('../middlewares/VALIDAR-JWT.JS');
const validaRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validar_campos');

module.exports = {
    ...validaRoles,
    ...validarCampos,
    ...validarJWT
}
