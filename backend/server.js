const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const filepath = "product-fixtures.json"

// Get all products
app.get('/api/products', (req, res) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        const products = JSON.parse(data);
        res.json(products);
      }
    });
  });
  
// Get a product by SKU
app.get('/api/products/:sku', (req, res) => {
    const productSku = req.params.sku;
  
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        const products = JSON.parse(data);
        const product = products.find(p => p.sku === productSku);
  
        if (product) {
          res.json(product);
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });
  
  
// Update a product by SKU
app.put('/api/products/:sku', (req, res) => {
    const productSku = req.params.sku;
    const updatedProductData = req.body;
  
    console.log("req:",req.params)
    console.log("req.body:",req.body)

    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        const products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.sku === productSku);
  
        if (productIndex !== -1) {
          products[productIndex] = { ...products[productIndex], ...updatedProductData };
  
          fs.writeFile(filepath, JSON.stringify(products), err => {
            if (err) {
              res.status(500).send('Error writing file');
            } else {
              res.json(products[productIndex]);
            }
          });
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });
  
// Delete a product by SKU
app.delete('/api/products/:sku', (req, res) => {
    const productSku = req.params.sku;
  
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        let products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.sku === productSku);
  
        if (productIndex !== -1) {
          products.splice(productIndex, 1);
  
          fs.writeFile(filepath, JSON.stringify(products), err => {
            if (err) {
              res.status(500).send('Error writing file');
            } else {
              res.sendStatus(204);
            }
          });
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
