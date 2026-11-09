const resend = require('../config/resend');

async function sendTestEmail(to) {
  const response = await resend.emails.send({
    from: 'Ecora <onboarding@resend.dev>',
    to: [to],
    subject: '¡Bienvenido a Ecora!',
    html: `
      <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">

          <title>Gracias por apoyar a Ecora</title>

          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #F5F3EE;
              font-family: Arial, Helvetica, sans-serif;
              color: #0B0B09;
            }

            table {
              border-spacing: 0;
              border-collapse: collapse;
            }

            img {
              border: 0;
              display: block;
              max-width: 100%;
            }

            a {
              text-decoration: none;
            }

            .serif {
              font-family: Georgia, "Times New Roman", serif;
            }

            .wrapper {
              width: 100%;
              background-color: #F5F3EE;
            }

            .container {
              width: 100%;
              max-width: 640px;
              margin: 0 auto;
            }

            .content {
              padding: 48px 56px;
            }

            .button {
              display: inline-block;
              background-color: #6F5F48;
              color: #FFFFFF !important;
              padding: 15px 28px;
              font-size: 12px;
              font-weight: bold;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }

            .divider {
              border-top: 1px solid #D8D4CA;
            }

            @media only screen and (max-width: 600px) {
              .content {
                padding: 36px 28px !important;
              }

              .mobile-padding {
                padding-left: 28px !important;
                padding-right: 28px !important;
              }

              .headline {
                font-size: 42px !important;
                line-height: 1.05 !important;
              }

              .body-text {
                font-size: 15px !important;
                line-height: 1.7 !important;
              }
            }
          </style>
        </head>

        <body>

          <table
            role="presentation"
            width="100%"
            class="wrapper"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td align="center">

                <table
                  role="presentation"
                  width="100%"
                  class="container"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width: 640px;"
                >

                  <!-- HEADER -->
                  <tr>
                    <td
                      class="mobile-padding"
                      style="
                        padding: 22px 40px;
                        border-bottom: 1px solid #D8D4CA;
                      "
                    >

                      <table role="presentation" width="100%">
                        <tr>

                          <td align="left">
                            <a href="{{APP_URL}}">
                              <span
                                class="serif"
                                style="
                                  font-size: 22px;
                                  font-weight: bold;
                                  letter-spacing: 2px;
                                  color: #0B0B09;
                                "
                              >
                                ECORA
                              </span>
                            </a>
                          </td>

                          <td
                            align="right"
                            style="
                              font-size: 10px;
                              letter-spacing: 1.5px;
                              color: #716C59;
                              text-transform: uppercase;
                            "
                          >
                            Moda que renace
                          </td>

                        </tr>
                      </table>

                    </td>
                  </tr>


                  <!-- INTRO -->
                  <tr>
                    <td class="content">

                      <div
                        style="
                          font-size: 10px;
                          letter-spacing: 3px;
                          color: #716C59;
                          text-transform: uppercase;
                          margin-bottom: 22px;
                        "
                      >
                        Gracias por estar aquí
                      </div>

                      <h1
                        class="serif headline"
                        style="
                          margin: 0 0 28px;
                          font-size: 52px;
                          line-height: 1.02;
                          font-weight: normal;
                          color: #0B0B09;
                        "
                      >
                        Tu apoyo también
                        <br>
                        <em>puede renacer.</em>
                      </h1>

                      <p
                        class="body-text"
                        style="
                          margin: 0 0 22px;
                          font-size: 15px;
                          line-height: 1.7;
                          color: #716C59;
                        "
                      >
                        Hola <strong style="color:#0B0B09;">
                          {{USER_NAME}}
                        </strong>,
                      </p>

                      <p
                        class="body-text"
                        style="
                          margin: 0 0 22px;
                          font-size: 15px;
                          line-height: 1.7;
                          color: #716C59;
                        "
                      >
                        Gracias por querer ser parte de ECORA. Tu interés en apoyar
                        nuestra iniciativa significa mucho para nosotros.
                      </p>

                      <p
                        class="body-text"
                        style="
                          margin: 0 0 32px;
                          font-size: 15px;
                          line-height: 1.7;
                          color: #716C59;
                        "
                      >
                        Creemos que la moda puede tener una segunda vida. Por eso
                        transformamos materiales que podrían terminar como residuos
                        en prendas pensadas para durar, manteniendo el diseño,
                        la personalidad y el propósito.
                      </p>

                      <!-- CTA -->
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <a
                              href="{{APP_URL}}"
                              class="button"
                            >
                              Conocer ECORA
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <!-- STATEMENT -->
                  <tr>
                    <td
                      class="content"
                      style="
                        padding-top: 0;
                        padding-bottom: 48px;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <tr>
                          <td class="divider"></td>
                        </tr>

                        <tr>
                          <td style="padding-top: 32px;">

                            <p
                              class="serif"
                              style="
                                margin: 0;
                                font-size: 27px;
                                line-height: 1.35;
                                color: #0B0B09;
                              "
                            >
                              “La moda también puede
                              <em>renacer.</em>”
                            </p>

                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <!-- IMPACT -->
                  <tr>
                    <td
                      style="
                        background-color: #0B0B09;
                        padding: 42px 56px;
                      "
                      class="mobile-padding"
                    >

                      <div
                        style="
                          font-size: 10px;
                          letter-spacing: 3px;
                          color: #AEA897;
                          text-transform: uppercase;
                          margin-bottom: 16px;
                        "
                      >
                        Nuestra iniciativa
                      </div>

                      <h2
                        class="serif"
                        style="
                          margin: 0 0 18px;
                          font-size: 30px;
                          line-height: 1.15;
                          font-weight: normal;
                          color: #F5F3EE;
                        "
                      >
                        Del desecho a una
                        <em>nueva oportunidad.</em>
                      </h2>

                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          line-height: 1.7;
                          color: #AEA897;
                        "
                      >
                        Cada persona que se suma nos ayuda a demostrar que es
                        posible hacer las cosas de una manera diferente.
                      </p>

                    </td>
                  </tr>


                  <!-- SUPPORT -->
                  <tr>
                    <td
                      class="content"
                      style="
                        text-align: center;
                        padding-top: 48px;
                        padding-bottom: 48px;
                      "
                    >

                      <div
                        style="
                          font-size: 10px;
                          letter-spacing: 3px;
                          color: #716C59;
                          text-transform: uppercase;
                          margin-bottom: 16px;
                        "
                      >
                        Sé parte del cambio
                      </div>

                      <h2
                        class="serif"
                        style="
                          margin: 0 auto 18px;
                          max-width: 420px;
                          font-size: 32px;
                          line-height: 1.2;
                          font-weight: normal;
                          color: #0B0B09;
                        "
                      >
                        Gracias por creer en una
                        <em>moda diferente.</em>
                      </h2>

                      <p
                        style="
                          max-width: 430px;
                          margin: 0 auto 28px;
                          font-size: 14px;
                          line-height: 1.7;
                          color: #716C59;
                        "
                      >
                        Tu apoyo nos acerca a un futuro donde crear algo nuevo
                        también significa cuidar lo que ya existe.
                      </p>

                      <a
                        href="{{SUPPORT_URL}}"
                        class="button"
                      >
                        Apoyar la iniciativa
                      </a>

                    </td>
                  </tr>


                  <!-- FOOTER -->
                  <tr>
                    <td
                      style="
                        background-color: #AEA897;
                        padding: 28px 40px;
                        text-align: center;
                      "
                      class="mobile-padding"
                    >

                      <div
                        class="serif"
                        style="
                          font-size: 19px;
                          letter-spacing: 2px;
                          color: #0B0B09;
                          margin-bottom: 10px;
                        "
                      >
                        ECORA
                      </div>

                      <p
                        style="
                          margin: 0 0 14px;
                          font-size: 11px;
                          line-height: 1.6;
                          color: #0B0B09;
                        "
                      >
                        Moda sostenible · Tela reciclada
                      </p>

                      <p
                        style="
                          margin: 0;
                          font-size: 10px;
                          line-height: 1.6;
                          color: #716C59;
                        "
                      >
                        © {{CURRENT_YEAR}} ECORA.
                        Todos los derechos reservados.
                      </p>

                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
      </html>
    `
  });

  return response;
}

async function sendFacturaEmail(orden, usuario, productos) {
  const productosHTML = productos.map(p => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${p.nombre}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${p.precio}</td>
    </tr>
  `).join('')

  const response = await resend.emails.send({
    from: 'Ecora <onboarding@resend.dev>',
    to: [''],
    subject: `Nueva orden #${orden.id} — Ecora`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; }
          .header { border-bottom: 2px solid #716C59; padding-bottom: 20px; margin-bottom: 30px; }
          .titulo { color: #716C59; font-size: 24px; margin: 0; }
          .orden-id { color: #999; font-size: 14px; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #716C59; color: white; padding: 10px; text-align: left; }
          .total { font-size: 18px; font-weight: bold; color: #0B0B09; text-align: right; margin-top: 20px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="titulo">ECORA — Nueva Orden</h1>
            <p class="orden-id">Orden #${orden.id}</p>
          </div>

          <h3>Datos del cliente</h3>
          <p><strong>Nombre:</strong> ${usuario.nombre}</p>
          <p><strong>Correo:</strong> ${usuario.correo}</p>
          <p><strong>Fecha:</strong> ${new Date(orden.fecha).toLocaleDateString('es-CR')}</p>
          <p><strong>Estado:</strong> ${orden.estado}</p>

          <h3>Productos</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align: right;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${productosHTML}
            </tbody>
          </table>

          <p class="total">Total: ${orden.total}</p>

          <div class="footer">
            <p>Este correo fue generado automáticamente por el sistema de Ecora.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })

  return response
}

module.exports = { sendTestEmail, sendFacturaEmail }