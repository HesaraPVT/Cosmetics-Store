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
        await Product.deleteOne({productId : req.params.productId}) // Delete the product with the specified productId from the database
        res.json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting product", error: error});
    }
}