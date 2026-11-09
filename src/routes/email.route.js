const express = require('express');

const router = express.Router();

const { sendTestEmail } = require('../services/email.service');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El correo es obligatorio'
      });
    }

    await sendTestEmail(email);

    res.status(200).json({
      success: true,
      message: `Correo enviado correctamente a ${email}`
    });

  } catch (error) {
    console.error('Error enviando email:', error);

    res.status(500).json({
      success: false,
      message: 'Error al enviar el correo'
    });
  }
});

module.exports = router;