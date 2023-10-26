const Orders = require("../models/Orders.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/orders/:id", (req, res) => {
  const { id } = req.params;

  Orders.findById(id)
    .then((oneOrder) => {
      res.json(oneOrder);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/orders", (req, res) => {
  const { orders } = req.body;
  const newOrder = new Orders({ orders });
  newOrder
    .save()
    .then(() => {
      res.status(201).json({ message: "Order saved successfully" });
    })
    .catch((error) => {
      console.error("Error saving order:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// For fetching seller orders
router.get('/orders/products/:idOwner', (req, res) => {
  const { idOwner } = req.params;

  Orders.find({ 'orders.products.idOwner': idOwner })
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({ message: 'No orders found for this idOwner.' });
      }

      res.status(200).json(orders);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
});



// For fetching user orders
router.get("/orders/user/:userId", (req, res) => {
  const { userId } = req.params;

  Orders.find({ "orders.user": userId })
    .then((orders) => {
      res.json(orders);
    })
    .catch((error) => {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.delete("/orders/:id", (req, res) => {
  const { id } = req.params;

  Orders.findByIdAndRemove(id)
    .then((deletedOrder) => {
      res.status(200).json({ message: "Order deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting order:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.put('/orders/products/:orderId/mark-as-sent', (req, res) => {
  const { orderId } = req.params;

  Orders.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      order.orders[0].transactionType = 'Sent';

      return order.save() 
        .then(() => {
          res.status(200).json({ message: 'Order marked as Sent.' });
        });
    })
    .catch((err) => {
      console.error("Error marking order as Sent:", err);
      res.status(500).json({ message: 'Server error' });
    });
});

module.exports = router;

module.exports = router;
