

const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validar_campos');

module.exports = {
    ...validaRoles,
    ...validarCampos,
    ...validarJWT
}
