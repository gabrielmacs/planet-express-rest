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




module.exports = obtenerProductos;