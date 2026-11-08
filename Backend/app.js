const express= require('express');
const morgan = require('morgan');
const path= require('path');
const mysql= require('mysql');
const cors = require('cors');
const myConnection= require('express-myconnection');

const app= express();

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", 
                    credentials: true
                }
            ]
        }
}
};

app.use(cors(
    config.application.cors.server
  ));


 // rutas backend
const empresa = require('./rutas/clientes');
const clientes = require('./rutas/clientes');
const proveedor = require('./rutas/proveedor');
const areas_trabajo = require('./rutas/areas_trabajo');
const detalle_compra = require('./rutas/detalle_compra');
const detalleventa = require('./rutas/detalleventa');
const empleados = require('./rutas/empleados');
const encabezado_compra = require('./rutas/encabezado_compra');
const encabezado_venta = require('./rutas/encabezado_venta');
const formapago = require('./rutas/formapago');
const producto = require('./rutas/producto');
const sucursales = require('./rutas/sucursales');
const tipoproducto = require('./rutas/tipoproducto');
const tipousuario = require('./rutas/tipousuario');
const usuario = require('./rutas/usuario');

  app.set('port', process.env.PORT || 3000);

  app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'sierra84$',
    port:3306,
    database:'ventas'
}, 'single'));
app.use(express.urlencoded({extended: false}));



var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api/empresa', empresa);
app.use('/api/proveedor', proveedor);
app.use('/api/clientes', clientes);
app.use('/api/formapago', formapago);
app.use('/api/areas_trabajo', areas_trabajo);
app.use('/api/detalle_compra', detalle_compra);
app.use('/api/detalleventa', detalleventa);
app.use('/api/empleados', empleados);
app.use('/api/encabezado_compra', encabezado_compra);
app.use('/api/encabezado_venta', encabezado_venta);
app.use('/api/producto', producto);
app.use('/api/sucursales', sucursales);
app.use('/api/tipoproducto', tipoproducto);
app.use('/api/tipousuario', tipousuario);
app.use('/api/usuario', usuario);

// archivos estaticos frontend
app.use(express.static(path.join(__dirname,'public')));



  //inicializando el server
app.listen(app.get('port'), () =>{
    console.log("PUERTO 3000");
});

