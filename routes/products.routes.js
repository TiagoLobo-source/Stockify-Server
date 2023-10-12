const { isAuthenticated } = require("../middleware/jwt.middleware");
const Product = require("../models/Product.model");

const router = require("express").Router();

//POST

router.post("/products", (req, res) => {
  const { title, description, stock, price, imageProduct, userId, category } =
    req.body;
  if (!title || !description || !stock || !price) {
    res.status(400).json({ message: "Please fill in all mandatory Fields" });
    return;
  }
  const idOwner = userId;
  Product.create({
    title,
    description,
    stock,
    price,
    imageProduct,
    idOwner,
    category,
  })
    .then((newProduct) => {
      res.status(400).json({ message: "Product Successfully Created" });
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

//GET
router.get("/products", isAuthenticated, (req, res) => {
  Product.find()

    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => {
      res.json(err);
    });
});

//find()
//findByIdAndUpdate()
//findByIdAndDelete()
//

//GET for 1 Product

router.get("/products/:id", (req, res) => {
  const { id } = req.params;

  Product.findById(id)

    .then((oneProduct) => {
      res.json(oneProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

//PUT

//Find a Product based on an id
//and then should change it based on what the user provides

router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, stock, price, imageProduct} = req.body;
  const isApproved = false;
  const isPassed = "pending";

  Product.findByIdAndUpdate(
    id,
    { title, description, stock, price, imageProduct, isPassed, isApproved },
    { new: true }
  )
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/productsapproval/:id", (req, res) => {
  const { id } = req.params;
  const isApproved = true;
  const isPassed = "approved";

  Product.findByIdAndUpdate(id, { isApproved, isPassed }, { new: true })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/productsrefusal/:id", (req, res) => {
  const { id } = req.params;
  const isApproved = false;
  const isPassed = "refused";
  const { reasonForRefusal } = req.body;
  Product.findByIdAndUpdate(
    id,
    { isApproved, isPassed, reasonForRefusal },
    { new: true }
  )
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

//DELETE
//create a route for deleting
// once a request is sent the document with the id in the params should be deleted from our Database
// send back as a response {message: "Product deleted"}

router.delete("/products/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.json({ message: "Product Not Found" });
        return;
      }
      res.json({ message: "Product deleted" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
