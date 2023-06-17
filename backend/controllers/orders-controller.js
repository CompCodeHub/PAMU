const mongoose = require("mongoose");
const Order = require("../models/orderModel");

// Creates an order
const createOrder = (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // If there are no items
  if (items && items.length === 0) {
    res.status(400).json({ error: "No order items!" });
  } else {
    Order.create({
      items: items.map((item) => ({
        ...item,
        product: item.id,
        _id: undefined,
      })),
      buyer: req.user._id,
      shippingAddress,
      paymentMethod,
      paidAt: Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
      .then((order) => res.status(201).json(order))
      .catch((err) => res.status(400).json({ error: err.message }));
  }
};

// Gets orders for individual user
const getUserOrders = (req, res) => {
  Order.find({ buyer: req.user._id })
    .then((orders) => res.status(200).json(orders))
    .catch((err) =>
      res.status(404).json({ error: "You don't have any orders!" })
    );
};

// Gets an order by given id
const getOrderById = (req, res) => {
  const { id } = req.params;

  // If id is not a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid order id!" });
  }

  Order.findById(id)
    .populate("buyer", "name email")
    .then((order) => {
      if (!order) {
        res.status(404).json({ error: "Order doesn't exist" });
      } else {
        res.status(200).json(order);
      }
    })
    .catch((err) =>
      res.status(404).json({ error: "Couldn't find an order with that id!" })
    );
};

// Updates an order to paid
// const updateOrdertoPaid = (req, res) => {
//   const { id } = req.params;

//   // If id is not a valid mongoose id
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Invalid order id!" });
//   }

//   // Update fields
//   Order.findByIdAndUpdate(id, {
//     $set: {
//       isPaid: true,
//       paidAt: Date.now(),
//     },
//   })
//     .then((order) => res.status(200).json(order))
//     .catch((err) => res.status(400).json({ error: "Couldn't update order" }));
// };

// Updates an order to delivered
const updateOrdertoDelivered = (req, res) => {

  // find by id and update fields
  Order.findByIdAndUpdate(req.params.id, {
    $set: { isDelivered: true, deliveredAt: Date.now() },
  })
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(400).json({ error: "Couldn't set delivery status" }));
};

// Gets all orders
const getOrders = (req, res) => {
  // Return all orders
  Order.find({})
    .populate("buyer", "id name")
    .then((orders) => res.status(200).json(orders))
    .catch((err) =>
      res.status(404).json({ error: "Couldn't find any orders!" })
    );
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  // updateOrdertoPaid,
  updateOrdertoDelivered,
  getOrders,
};
