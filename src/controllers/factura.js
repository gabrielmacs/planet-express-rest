var checkdigit = require('checkdigit');
const rutasPuntosEmision = require('../controllers/puntoEmision');


const mysqlConnection = require('../database.js');
const obtenerJsonRes = require('./respuestaJSON.js');


async function crearClaveAcceso(fechaEmision, ruc, ambiente, codigoComprobante, tipoEmision) {

  auxClaveAcceso = fechaEmision + "01" + ruc + ambiente + codigoComprobante + "12345678" + tipoEmision;
  digitoVerificador = checkdigit.mod11.create(auxClaveAcceso);

  console.log(auxClaveAcceso + digitoVerificador)
  return auxClaveAcceso + digitoVerificador
}

async function insertarBDD() {
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

const crearFactura = async  (req, res) => {
  try {
  createdAt = new Date();
  updatedAt = new Date();
  
    const { cliente_id, emisor_id, establecimiento_id, estado, ambiente, tipoEmision, formaPago, fechaEmision, totalSinImpuestos, subtotal12, subtotal0, subtotalNoIVA, subtotalExentoIVA, valorICE, valorIRBPNR, iva12, totalDescuento, propina, valorTotal, firmado, enviarSiAutorizado, observacion, ptoEmision_id, createdBy_id, updatedBy_id, user_id, ruc } = await req.body;

    console.log(updatedAt)
    const secuencial = await rutasPuntosEmision.obtenerPtoEmision(user_id)

    rutasPuntosEmision.obtenerPtoEmision
    
    const claveAcceso = await crearClaveAcceso(fechaEmision, ruc, ambiente, '001' + '001' + secuencial, tipoEmision);




  } catch (e) {

  }



}
exports.crearFactura = crearFactura;
