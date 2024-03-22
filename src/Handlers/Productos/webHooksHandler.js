const {
  MercadoPagoConfig,
  Preference,
  Payment,
  MerchantOrder,
} = require("mercadopago");
const { Compras, CompraProducto, User } = require("../../db");
const compraFinalizada = require("../../Email/CompraFinalizada");

require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN || "",
});
const payment = new Payment(client);

const merchantOrder = new MerchantOrder(client);

const webhookHandler = async (req, res) => {
  console.log("asdasdasd");

  // info del payment para solicitar / ver info del pago
  const query = req.query;

  try {
    if (query.type == "payment") {
      const paymentId = query["data.id"];

      console.log(paymentId, "payment");
      // obtenemos info pago
      const pymentInfo = await payment.get({ id: paymentId });
      // if (response.ok) {
      //   // si tenemos info  /// la pasamos a json
      //   const data = await response.json();
      //   console.log(data, "dataaaaaaaaaaa");
      // }
    }

    if (query.topic == "merchant_order") {
      console.log(req.body, "<-- Body merchant order");

      console.log(req.query, "<-- Query merchant order");

      const order = await merchantOrder.get({
        merchantOrderId: req.query.id,
      });

      console.log(order, "orderasda");
      console.log(req.query.id, "req id");

      const Find = await Compras.findAll({
        where: {
          id_merchant_order: req.query.id,
        },
      });

      console.log(Find, "find");

      if (Find?.length === 0) {
        const CompraCreada = await Compras.create({
          userId: order.additional_info,
          id_merchant_order: req.query.id,
          monto_total: order.total_amount,
          status: order.order_status,
        });

        console.log(CompraCreada, "CREAR COMPRA");

        const AgregarProductos = [];

        order.items.forEach((el) => {
          let quantity = el.quantity;

          console.log(quantity, "la quantity");

          for (let i = 0; i < quantity; i++) {
            AgregarProductos.push({
              id_compra: CompraCreada.id,
              id_producto: el.id,
            });
          }
        });

        console.log(AgregarProductos, "agregar productos");
        const user = await User.findByPk(order.additional_info);

        console.log(user, "-----------");

        compraFinalizada(user.name, user.email);

        await CompraProducto.bulkCreate(AgregarProductos);
      } else {
        await Compras.update(
          {
            status: order.order_status,
          },
          {
            where: {
              id_merchant_order: req.query.id,
            },
          }
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500);
  }
};

module.exports = webhookHandler;
