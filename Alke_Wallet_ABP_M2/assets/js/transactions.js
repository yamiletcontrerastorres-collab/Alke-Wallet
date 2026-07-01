$(document).ready(function () {

  // Obtener movimientos desde localStorage o inicializar con ejemplos
  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [
    { tipo: "compra", descripcion: "Compra Amazon", monto: -50000, fecha: new Date().toISOString() },
    { tipo: "deposito", descripcion: "Depósito inicial", monto: 100000, fecha: new Date().toISOString() },
    { tipo: "transferencia", descripcion: "Transferencia recibida", monto: 75000, fecha: new Date().toISOString() },
    { tipo: "compra", descripcion: "Compra WebPay", monto: -18500, fecha: new Date().toISOString() }
  ];

  // Guardar en localStorage si no existían
  localStorage.setItem("movimientos", JSON.stringify(movimientos));

  // Función para mostrar movimientos filtrados y ordenados
  function mostrarMovimientos(filtro = "todos", limite = 5) {
    $("#listaMovimientos").empty();

    // Filtrar según tipo
    let lista = filtro === "todos" ? movimientos : movimientos.filter(m => m.tipo === filtro);
    // Ordenar por fecha (más reciente primero)
    lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Limitar el número de movimientos mostrados
    lista = lista.slice(5, 5 + limite);

    // Si no hay movimientos
    if (lista.length === 0) {
      $("#listaMovimientos").append(`<li class="list-group-item">No existen movimientos.</li>`);
      return;
    }

    // Pintar cada movimiento?? dios mio aiudame
    lista.forEach(m => {
      let descripcion = m.descripcion || "Movimiento";
      let tipo = getTipoTransaccion(m.tipo);
      let monto = isNaN(m.monto) ? 0 : m.monto;

      let clase = monto >= 0 ? "list-group-item-success" : "list-group-item-danger";
      let signo = monto >= 0 ? "+" : "-";

      $("#listaMovimientos").append(`
        <li class="list-group-item ${clase}">
          <strong>${descripcion}</strong><br>
          ${tipo}
          <span class="float-end">
            ${signo}$${Math.abs(monto).toLocaleString("es-CL")}
          </span>
        </li>
      `);
    });
  }


  function getTipoTransaccion(tipo) {
    switch (tipo) {
      case "compra": return "Compra";
      case "deposito": return "Depósito";
      case "transferencia": return "Transferencia";
      default: return "Movimiento";
    }
  }

  // Mostrar todos al cargar la página
  mostrarMovimientos();

  // Filtrar según selección del <select>
  $("#filtroMovimiento").change(function () {
    mostrarMovimientos($(this).val());
  });

});
