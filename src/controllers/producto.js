const mysqlConnection = require('../database.js');

const obtenerJsonRes = require('./respuestaJSON.js');

const obtenerProductos = async (req, res) => {
    const { emisor_id, autorizacion } = req.body;
    mysqlConnection.query('select id,codigoPrincipal,nombre,precioUnitario,impuesto_iva_id from producto where emisor_id=?', emisor_id, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                estado = 200;
                mensaje = 'Productos encontrados satisfactoriamente.';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            } else {
                estado = 200;
                mensaje = 'No se encontro ningún producto.';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            }
        } else {
            estado = 401;
            mensaje = 'No se pudo conectar con el servidor.';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
        }
    });

}



const crearProducto = async (req, res) => {
    createdAt = new Date();
    updatedAt = new Date();
    const { emisor_id, impuesto_iva_id, codigoPrincipal, codigoAuxiliar, nombre, precioUnitario, createdBy_id, updatedBy_id } = req.body;
    mysqlConnection.query('insert into producto (emisor_id,impuesto_iva_id,codigoPrincipal,codigoAuxiliar,nombre,precioUnitario,createdBy_id,updatedBy_id,createdAt,updatedAt )  values  (?,?,?,?,?,?,?,?,?,?)', [emisor_id, impuesto_iva_id, codigoPrincipal, codigoAuxiliar, nombre, precioUnitario, createdBy_id, updatedBy_id, createdAt, updatedAt], (err, rows, fields) => {
        if (!err) {

            autorizacion = ""
            rows.mensaje = "Producto creado correctamente";
            estado = 200;
            mensaje = 'Producto creado correctamente';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));

        } else {
            console.log(err)
            autorizacion = ""
            estado = 400;
            mensaje = 'Error: Los datos del Producto son incorrectos.';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
        }
    });

}




exports.obtenerProductos = obtenerProductos;


exports.crearProducto = crearProducto;
