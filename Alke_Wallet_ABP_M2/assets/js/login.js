$(document).ready(function () {
  // Manejo del formulario de inicio de sesión
  $("#formLogin").submit(function (e) {

    e.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (email === "" || password === "") {

      $("#alert-container").html(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Debes completar todos los campos.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `);

      return;
    }
    // Validación de credenciales (simulada)
    if (
      email === "admin.alke_wallet@gmail.com" &&
      password === "123456"
    ) {

      $("#alert-container").html(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Inicio de sesión exitoso.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `);
      // Redirigir a la página de menú después de 2 segundos
      $("#loader").removeClass("hidden");

      setTimeout(function () {

        window.location.href = "menu.html";

      }, 2000);
      // Si las credenciales son incorrectas, mostrar alerta de error//
      // Si las credenciales son correctas, mostrar alerta de éxito y redirigir a la página de menú después de 2 segundos//
    } else {

      $("#alert-container").html(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Correo o contraseña incorrectos.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `);

    }

  });

});