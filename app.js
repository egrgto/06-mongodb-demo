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

/*
async function crearPayoneerReport(){
    const payoneerReport = new PayoneerReport({
        date : '12 Sep, 2021',
        description : 'emir@live.com.ar',
        amount : '1500.00',
        currency : 'USD',
        status : 'Completed',
        reportName : 'Test'
    })
    
    const res = await payoneerReport.save();
    console.log(res);
}

crearPayoneerReport();
*/

async function listarPayoneerReport(){
    
    const numeroPage = 2;
    const sizePage = 10;
    // api/payoneerReport?numeroPage=4&sizePage=10

    const payoneerReport = await PayoneerReport
        //.find({ amount : 500}) //buscar y filtrar
        
        .find() //buscar todo

        .skip((numeroPage-1)*sizePage) //Paginacion
        
        .and([
            {description:/.*acost.*/},
            {amount:{$gte:500}}
        ]) //Expresiones Regulares y operadores logicos
        
        .limit(sizePage) //Paginacion
        
        .sort({date: -1}) //fecha descendente
        
        .select({
            description:1
        }) //seleccionar campos a mostrar
        ;
    console.log(payoneerReport);
}

listarPayoneerReport();