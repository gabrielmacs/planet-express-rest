var checkdigit = require('checkdigit');

const claveAcceso = crearClaveAcceso("16122019", "1792095468001", "1", "001001000000003", "1")

const mysqlConnection = require('../database.js');
const obtenerJsonRes = require('./respuestaJSON.js');


function crearClaveAcceso(fechaEmision, ruc, ambiente, codigoComprobante, tipoEmision) {
  auxClaveAcceso = fechaEmision + "01" + ruc + ambiente + codigoComprobante + "12345678" + tipoEmision;

  digitoVerificador = checkdigit.mod11.create(auxClaveAcceso);
  return auxClaveAcceso + digitoVerificador
}




const crearFactura = async (req, res) => {
  console.log(req.body)
  createdAt = new Date();
  updatedAt = new Date();
  const { cliente_id, emisor_id, establecimiento_id, claveAcceso, estado, ambiente, tipoEmision, secuencial, formaPago, fechaEmision, totalSinImpuestos, subtotal12, subtotal0, subtotalNoIVA, subtotalExentoIVA, valorICE, valorIRBPNR, iva12, totalDescuento, propina, valorTotal, firmado, enviarSiAutorizado, observacion, ptoEmision_id, createdBy_id, updatedBy_id } = req.body;
  console.log(cliente_id, emisor_id, establecimiento_id, claveAcceso, estado, ambiente, tipoEmision, secuencial, formaPago, fechaEmision, totalSinImpuestos, subtotal12, subtotal0, subtotalNoIVA, subtotalExentoIVA, valorICE, valorIRBPNR, iva12, totalDescuento, propina, valorTotal, firmado, enviarSiAutorizado, observacion, createdAt, updatedAt, ptoEmision_id, createdBy_id, updatedBy_id)
  mysqlConnection.query('INSERT INTO factura (cliente_id,emisor_id,establecimiento_id,claveAcceso,estado,ambiente,tipoEmision,secuencial,formaPago,fechaEmision,totalSinImpuestos,subtotal12,subtotal0,subtotalNoIVA,subtotalExentoIVA,valorICE,valorIRBPNR,iva12,totalDescuento,propina,valorTotal,firmado,enviarSiAutorizado,observacion,createdAt,updatedAt,ptoEmision_id,createdBy_id,updatedBy_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [cliente_id, emisor_id, establecimiento_id, claveAcceso, estado, ambiente, tipoEmision, secuencial, formaPago, fechaEmision, totalSinImpuestos, subtotal12, subtotal0, subtotalNoIVA, subtotalExentoIVA, valorICE, valorIRBPNR, iva12, totalDescuento, propina, valorTotal, firmado, enviarSiAutorizado, observacion, createdAt, updatedAt, ptoEmision_id, createdBy_id, updatedBy_id], (err, rows, fields) => {

    if (!err) {
      rows.mensaje = "Factura creada correctamente";
      autorizacion = ""
      estadoRes = 200;
      mensaje = 'Factura creada correctamente';
      res.status(estadoRes).json(obtenerJsonRes(mensaje, autorizacion, rows));

    } else {
      console.log(err)
      autorizacion = ""
      estadoRes = 400;
      mensaje = 'Error: Los datos de la Factura son incorrectos.';
      res.status(estadoRes).json(obtenerJsonRes(mensaje, autorizacion, rows));
    }
  });

}
exports.crearFactura = crearFactura;