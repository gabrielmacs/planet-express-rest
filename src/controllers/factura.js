var checkdigit = require('checkdigit');

const claveAcceso=crearClaveAcceso("16122019", "1792095468001", "1", "001001000000003", "1")

const mysqlConnection = require('../database.js');


function crearClaveAcceso(fechaEmision, ruc, ambiente, codigoComprobante, tipoEmision) {
    auxClaveAcceso=fechaEmision + "01" + ruc + ambiente + codigoComprobante + "12345678" + tipoEmision;
    
    digitoVerificador=checkdigit.mod11.create(auxClaveAcceso);
    return auxClaveAcceso + digitoVerificador
  }



  module.exports = crearFactura;