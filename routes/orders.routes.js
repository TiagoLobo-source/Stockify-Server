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
  const { userId } = req.params;


 
  Orders.find({ 'orders.products.idOwner': userId }, (err, orders) => {console.log(orders)
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this idOwner.' });
    }

    res.status(200).json(orders);
  });
});


// For fetching user orders
router.get("/orders/user/:userId",  (req, res) => {
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
module.exports = router;
