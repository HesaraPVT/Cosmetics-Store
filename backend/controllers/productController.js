import Product from "../models/product.js";
import User from "../models/user.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
    // Product.find().then((data) => {
    //     res.json(data);
    // }).catch((error) => {
    //     res.json({message: "Error fetching products", error: error});
    // });
    try {
        if (isAdmin(req)){
            const products = await Product.find(); // Fetch all products from the database if its an admin user
            res.json(products);
        } else {
            const products = await Product.find({isAvailable: true}); // Fetch only available products from the database for non-admin users
            res.json(products);
        }

    } catch (error) {
        res.json({message: "Error fetching products", error: error});
    }
}

export function saveProduct(req, res) {
    // Check if the user making the request has an admin role before allowing them to create a new product
    if (!isAdmin(req)){
        res.status(403).json({message: "Unauthorized Access! You are not authorized to create products"});
        return;
    }

    const product = new Product(req.body); //create a new product document

    product.save().then(() => {
        res.json({message: 'Product created successfully'});
    }).catch((error) => {
        console.log('Error saving product', error);
        res.status(500).json({message: 'Error saving product'});
    });
}

export async function deleteProduct(req, res) {
    // Check if the user making the request has an admin role before allowing them to delete a product
    if (!isAdmin(req)){
        res.status(403).json({message: "Unauthorized Access! You are not authorized to delete products"});
        return;
    }
    try {
        await Product.deleteOne({productId : req.params.productId}); // Delete the product with the specified productId from the database
        res.json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting product", error: error});
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req)){
        res.status(403).json({message: "Unauthorized Access! You are not authorized to update products"});
        return;
    }

    const productId = req.params.productId;
    const updatingData = req.body;

    try {
        await Product.updateOne({productId: productId}, updatingData); // Update the product with the specified productId in the database using the data provided in the request body
        res.json({message: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Error updating product", error: error});
    }
}

export async function getProductById(req, res) { // get a product by its productId
    const productId = req.params.productId;
    
    try {
        const product = await Product.findOne({productId: productId}); // Fetch the product with the specified productId from the database
        if (product == null) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        if (product.isAvailable) {
            res.json(product);
        } else {
            if (!isAdmin(req)) {
                res.status(404).json({message: "Product is not available"});
            } else {
                res.json(product);
            }
        }
    } catch (error) {
        res.status(500).json({message: "Error fetching product", error: error});
    }
}