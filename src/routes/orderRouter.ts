import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../model/orderModel';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req: express.Request, res: express.Response) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  }),
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: express.Request, res: express.Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  }),
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  }),
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (req.body.status === 'successful') {
        order.isPaid = true;
      }
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.transaction_id,
        status: req.body.status,
        email_address: req.body.customer.email,
      };
      const updatedOrder = await order.save();
      if (req.body.status === 'successful') {
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.send({ message: 'Error in Payment', order: updatedOrder });
      }
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  }),
);

export default orderRouter;
