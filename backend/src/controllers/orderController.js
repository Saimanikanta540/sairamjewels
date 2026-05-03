const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount } = req.body;

    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount,
    });

    const createdOrder = await order.save();

    // Clear user cart after order
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (order && order.userId.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById };