//Definicion de paquetes
const mongoose = require('mongoose');

//Conexion a base de datos
mongoose.connect('mongodb://localhost/demo')
.then(()=> console.log('Conectado a MongoDB...'))
.catch(err => console.log('No se pudo conectar con MongoDB..',err));

//Crear esquema para el uso de la base de datos
const payoneerReportSchema= new mongoose.Schema({
    date        : Date,
    description : String,
    amount      : Number,
    currency    : String,
    status      : String,
    reportName  : String,
    uploadDate  : {type: Date, default:Date.now}
})

const PayoneerReport = mongoose.model('PayoneerReport',payoneerReportSchema);

async function crearPayoneerReport(){
    const payoneerReport = new PayoneerReport({
        date : '14 Sep, 2021',
        description : 'david.acosta@live.com.ar',
        amount : '500.00',
        currency : 'USD',
        status : 'Completed',
        reportName : 'Test'
    })
    
    const res = await payoneerReport.save();
    console.log(res);
}

crearPayoneerReport();