// Se leen los elementos del DOM
const form = document.querySelector('form');

// Se agrega el listener al formulario
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const CiudadOrigen = document.getElementById('CiudadOrigen').value;
  const CiudadDestino = document.getElementById('CiudadDestino').value;
  const FechaSalida = document.getElementById('FechaSalida').value;
  const HoraSalida = document.getElementById('HoraSalida').value;

  const CostoBase = 200;
  const RecargoCiudad = CalcularRecargoCiudad(CiudadOrigen, CiudadDestino);
  const RecargoFinDeSemana = CalcularRecargoDia(FechaSalida);
  const RecargoHoraSalida = CalcularRecargoHora(HoraSalida);
  const CostoTotal = CostoBase + RecargoCiudad + RecargoFinDeSemana + RecargoHoraSalida;

  document.getElementById('CostoBase').value = "$ "+CostoBase.toFixed(2);
  document.getElementById('RecargoCiudad').value = "$ "+RecargoCiudad.toFixed(2);
  document.getElementById('RecargoFinSemana').value = "$ "+RecargoFinDeSemana.toFixed(2);
  document.getElementById('RecargoHoraPico').value = "$ "+RecargoHoraSalida.toFixed(2);
  document.getElementById('CostoTotal').value = "$ "+CostoTotal.toFixed(2);
});

// Se establece el restablecimiento del formulario
form.addEventListener('reset', function(event) {
  document.getElementById('CostoBase').value = "";
  document.getElementById('RecargoCiudad').value = "";
  document.getElementById('RecargoFinSemana').value = "";
  document.getElementById('RecargoHoraPico').value = "";
  document.getElementById('CostoTotal').value = "";
});

// Funciones para calculos de recargos
function CalcularRecargoCiudad( CiudadOrigen, CiudadDestino ) {
  if ( CiudadOrigen == CiudadDestino ) {
    return 0;
  } else {
    return 50;
  }
}

function CalcularRecargoDia( Fecha ) {
  const DiaSalida = new Date(Fecha).getDay();
  
  if ( DiaSalida == 4 || DiaSalida == 5 || DiaSalida == 6 ){
    return 100;
  } else {
    return 0;
  }
}

function CalcularRecargoHora( Hora ) {
  const HoraSalida = new Number(Hora.substring(0, 2));
  
  if ( ( HoraSalida >= 7 && HoraSalida <= 9 ) || ( HoraSalida >= 16 && HoraSalida <= 18 ) ) {
    return 75;
  } else {
    return 0;
  }
}