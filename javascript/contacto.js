// Inicializar EmailJS
(function () {
  emailjs.init("m8cUYbeua1qgNHAAH");
})();

// Manejar el envío del formulario
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    emailjs.sendForm("service_0g9x124", "template_prfqsic", this).then(
      function () {
        alert("Correo enviado exitosamente!");
      },
      function (error) {
        alert("Error al enviar el correo: " + JSON.stringify(error));
      }
    );
  });
