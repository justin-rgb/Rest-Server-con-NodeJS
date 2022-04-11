const mongoose = require('mongoose')

const dbConnection = async () =>{

    try{

        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database is online');

    }catch(error){
        throw new Error('Error al conectar al momento de iniciar la BD')
    }

}


module.exports = {
    dbConnection
}