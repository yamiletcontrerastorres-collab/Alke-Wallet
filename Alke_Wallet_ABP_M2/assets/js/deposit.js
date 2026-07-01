$(document).ready(function () {

  // Saldo inicial
  let saldo = Number(localStorage.getItem("saldo")) || 0;

  // Mostrar saldo actual
  $("#saldoActual").text(`$${saldo.toLocaleString("es-CL")}`);

  // Manejo del formulario de depósito
  $("#deposit-form").submit(function (e) {
    e.preventDefault();

    const monto = Number($("#monto").val());

    // Validación del monto
    if (isNaN(monto) || monto <= 0) {
      $("#alert-container").html(`
        <div class="alert alert-danger alert-dismissible fade show">
          Ingresa un monto válido.
          <button class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      `);
      return;
    }

    // Actualizar saldo
    saldo += monto;
    localStorage.setItem("saldo", saldo);

    // Guardar movimiento con fecha
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    movimientos.push({
      tipo: "deposito",
      descripcion: "Depósito",
      monto: monto,
      fecha: new Date().toISOString()
    });
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    // Mostrar saldo actualizado
    $("#saldoActual").text(`$${saldo.toLocaleString("es-CL")}`);

    // Leyenda con el monto depositado (visible debajo del formulario)
    $("#mensajeDeposito").html(`
      <div class="alert alert-info mt-2">
        💰 Has depositado: <strong>$${monto.toLocaleString("es-CL")}</strong>
      </div>
    `);

    // Alerta de éxito
    $("#alert-container").html(`
      <div class="alert alert-success alert-dismissible fade show">
        Depósito realizado correctamente.
        <button class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `);

    // Limpiar input
    $("#monto").val("");

    // Redirigir al menú después de 2 segundos
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 2000);
  });

});
