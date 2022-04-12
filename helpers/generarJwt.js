const jwt = require('jsonwebtoken')

const generarJWT = (uid, name, email) =>{

    return new Promise ((resolve, reject) => {
        
        const payload = { uid, name, email };

        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ){
                console.log('Error al generar el token');
            }else{
                resolve(token);
            }
        })

    })

}

module.exports = {
    generarJWT
}