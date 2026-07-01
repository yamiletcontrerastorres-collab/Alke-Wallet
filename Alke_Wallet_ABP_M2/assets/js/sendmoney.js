$(function () {

  // =========================
  // CARGAR CONTACTOS
  // =========================
  function cargarContactos(filtro = "") {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    $("#contacto").html('<option value="">Seleccione un contacto...</option>');

    contactos
      .filter(c => {
        let texto = `${c.nombre} ${c.alias} ${c.cbu}`.toLowerCase();
        return texto.includes(filtro.toLowerCase());
      })
      .forEach(c => {
        $("#contacto").append(`
          <option value="${c.cbu}">
            ${c.nombre} - ${c.alias}
          </option>
        `);
      });
  }

  cargarContactos();

  // =========================
  // FILTRO (datalist)
  // =========================
  $("#exampleDataList").on("input", function () {
    cargarContactos($(this).val());
  });

  // =========================
  // GUARDAR CONTACTO (modal)
  // =========================
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    let nuevo = {
      nombre: $("#nombre").val().trim(),
      alias: $("#alias").val().trim(),
      cbu: $("#cbu").val().trim(),
      banco: $("#banco").val().trim()
    };

    if (!nuevo.nombre || !nuevo.alias || !nuevo.cbu || !nuevo.banco) {
      $("#alert-container").html(`<div class="alert alert-danger">❌ Completa todos los campos</div>`);
      return;
    }

    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(nuevo);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    $("#alert-container").html(`<div class="alert alert-success">✅ Contacto agregado correctamente</div>`);

    $("#contactForm")[0].reset();
    $("#modalContact").addClass("hidden");

    cargarContactos($("#exampleDataList").val());
  });

  // =========================
  // VALIDAR BOTÓN TRANSFERIR
  // =========================
  function validarBotonTransferir() {
    let contactoSeleccionado = $("#contacto").val();
    let monto = Number($("#montoTransferencia").val());

    if (contactoSeleccionado && monto > 0) {
      $("#btnTransferir").fadeIn().prop("disabled", false);
      $("#contacto option").removeClass("bg-primary text-white");
      $("#contacto option:selected").addClass("bg-primary text-white");
    } else {
      $("#btnTransferir").hide().prop("disabled", true);
    }
  }

  // Estado inicial
  $("#btnTransferir").hide().prop("disabled", true);

  // Detectar cambios en contacto y monto
  $("#contacto").on("change", validarBotonTransferir);
  $("#montoTransferencia").on("input", validarBotonTransferir);

  // =========================
  // TRANSFERIR
  // =========================
  $("#sendForm").on("submit", function (e) {
    e.preventDefault();

    let contactoSeleccionado = $("#contacto option:selected").val();
    let nombreContacto = $("#contacto option:selected").text();
    let monto = Number($("#montoTransferencia").val());
    let saldo = Number(localStorage.getItem("saldo")) || 0;

    if (!contactoSeleccionado) {
      $("#alert-container").html(`<div class="alert alert-warning">❌ Selecciona un contacto</div>`);
      return;
    }

    if (!monto || monto <= 0) {
      $("#alert-container").html(`<div class="alert alert-warning">❌ Monto inválido</div>`);
      return;
    }

    if (monto > saldo) {
      $("#alert-container").html(`<div class="alert alert-danger">❌ Saldo insuficiente</div>`);
      return;
    }

    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    movimientos.push({
      tipo: "transferencia",
      descripcion: `Transferencia a ${nombreContacto}`,
      monto: -monto,
      fecha: new Date().toISOString()
    });
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    $("#alert-container").html(`<div class="alert alert-success">✅ Transferencia realizada con éxito</div>`).hide().fadeIn(400).delay(2000).slideUp(400);
    $("#montoTransferencia").val("");

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1500);
  });

});

// =========================
// ABRIR / CERRAR MODAL
// =========================
$("#btnAddContact").on("click", function () {
  $("#modalContact").removeClass("hidden");
});

$("#cerrarModal").on("click", function () {
  $("#modalContact").addClass("hidden");
});
