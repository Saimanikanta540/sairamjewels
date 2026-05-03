const CustomOrder = require('../models/CustomOrder');
const { generateDesignBrief } = require('../services/geminiService');

const createCustomOrder = async (req, res, next) => {
  try {
    const { userPrompt } = req.body;

    if (!userPrompt) {
      res.status(400);
      throw new Error('Please provide a design idea');
    }

    const aiResponse = await generateDesignBrief(userPrompt);

    const customOrder = new CustomOrder({
      userId: req.user._id,
      userPrompt,
      aiResponse
    });

    const createdOrder = await customOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

const getCustomOrders = async (req, res, next) => {
  try {
    const orders = await CustomOrder.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCustomOrder, getCustomOrders };