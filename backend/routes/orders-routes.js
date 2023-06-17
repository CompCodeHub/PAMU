const express = require("express");
const {
  getOrders,
  getOrderById,
  getUserOrders,
  updateOrdertoPaid,
  updateOrdertoDelivered,
  createOrder,
} = require("../controllers/orders-controller");
const router = express.Router();
const { userAuth, adminAuth } = require("../middleware/authMiddleware");

// GET /orders (Admin protected) && POST /orders (User protected)
router
  .route("/")
  .get(userAuth, adminAuth, getOrders)
  .post(userAuth, createOrder);

// GET /orders/myorders (User protected)
router.route("/myorders").get(userAuth, getUserOrders);

// GET /orders/:id (User protected)
router.route("/:id").get(userAuth, getOrderById);

// // PUT /orders/:id/pay (User protected)
// router.route("/:id/pay").put(userAuth, updateOrdertoPaid);

// PUT /orders/:id/deliver (Admin protected)
router.route("/:id/deliver").put(userAuth, adminAuth, updateOrdertoDelivered);

module.exports = router;
