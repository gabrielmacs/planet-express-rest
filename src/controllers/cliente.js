const mysqlConnection = require('../database.js');

const obtenerJsonRes = require('./respuestaJSON.js');


const obtenerClientes = async (req, res) => {
    const { emisor_id, autorizacion } = req.body;
    mysqlConnection.query('select id,nombre,identificacion,celular,correoElectronico from cliente where emisor_id=?', emisor_id, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                estado = 200;
                mensaje = 'Clientes encontrados satisfactoriamente.';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            } else {
                estado = 200;
                mensaje = 'No se encontro ningún cliente.';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            }
        } else {
            estado = 400;
            mensaje = 'Error: no se pudo obtener los clientes';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
        }
    });

}


const crearCliente = async (req, res) => {
    createdAt=new Date();
    updatedAt=new Date();
    const { emisor_id, nombre, tipoIdentificacion, identificacion, direccion, celular, correoElectronico, createdBy_id, updatedBy_id } = req.body;
    mysqlConnection.query('insert into cliente (emisor_id,nombre,tipoIdentificacion,identificacion,direccion,celular,correoElectronico,createdBy_id,updatedBy_id,createdAt,updatedAt ) values (?,?,?,?,?,?,?,?,?,?,?)', [emisor_id, nombre, tipoIdentificacion, identificacion, direccion, celular, correoElectronico, createdBy_id, updatedBy_id,createdAt,updatedAt], (err, rows, fields) => {
        if (!err) {
           
                autorizacion=""
                rows.mensaje="Cliente creado correctamente";
                estado = 200;
                mensaje = 'Cliente creado correctamente';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
          
        } else {
            autorizacion=""
            estado = 400;
            mensaje = 'Error: Los datos del cliente son incorrectos.';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
        }
    });

}




exports.obtenerClientes = obtenerClientes;

exports.crearCliente = crearCliente;