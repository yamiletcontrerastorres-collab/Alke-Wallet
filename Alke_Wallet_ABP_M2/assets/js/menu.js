$(document).ready(function () {
    // Saldo inicial
    let saldo = Number(localStorage.getItem("saldo")) || 0;
    $("#saldo").text(`$${saldo.toLocaleString("es-CL")}`);

    // =========================
    // FUNCIÓN DE REDIRECCIÓN CON EFECTOS
    // =========================
    function redireccionar(destino, texto, boton) {
        // Animación del botón clicado
        $(boton).animate({ opacity: 0.5 }, 200).animate({ opacity: 1 }, 200);

        // Mostrar mensaje con efecto
        $("#mensajeMenu").html(`
            <div class="alert alert-info">${texto}</div>
        `).hide().fadeIn(400).delay(1000).fadeOut(400);

        // Mostrar loader
        $("#loader").removeClass("hidden");

        // Redirigir después de 2 segundos
        setTimeout(function () {
            window.location.href = destino;
        }, 2000);
    }

    // =========================
    // MANEJO DE BOTONES DEL MENÚ
    // =========================
    $("#btnDepositar").click(function () {
        redireccionar("deposit.html", "Redirigiendo a Depósitos...", this);
    });

    $("#btnEnviar").click(function () {
        redireccionar("sendmoney.html", "Redirigiendo a Enviar Dinero...", this);
    });

    $("#btnMovimientos").click(function () {
        redireccionar("transactions.html", "Redirigiendo a Últimos Movimientos...", this);
    });

    // =========================
    // OCULTAR LOADER AL VOLVER
    // =========================
    $(window).on("pageshow", function () {
        $("#loader").addClass("hidden");
    });
});
