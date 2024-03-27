// SDK
const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN || "",
});

const paymentHandler = async (req, res) => {
  try {
    const { products, userId } = req.body;

    const items = [];

    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      items.push({
        id: product.id,
        title: product.title,
        quantity: product.cantidad,
        currency_id: "ARS",
        unit_price: Number(product.price),
      });
    }

    const bodyProducts = {
      items,
      back_urls: {
        success: "https://e-commerce-front-compra-mas.vercel.app/",
        failure: "https://e-commerce-front-compra-mas.vercel.app/",
        pending: "https://e-commerce-front-compra-mas.vercel.app/",
      },
      //timer al finalizar
      auto_return: "approved",
      notification_url:
        "https://e-commerce-back-compramas.onrender.com/webhook",
      additional_info: userId,
    };

    const preference = new Preference(client);
    const response = await preference.create({ body: bodyProducts });

    return res.status(200).json({ id: response.id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = paymentHandler;
