import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    if (req.user == null) { // Check if the user making the request is authenticated
        res.status(403).json({message: "Unauthorized Access! Please login first"});
        return;
    }

    const orderInfo = req.body; // Get the order information from the request body

    if (orderInfo.name == null) { // Check if the order information is provided in the request body
        orderInfo.name = req.user.firstName + " " + req.user.lastName; // If no order information is provided, set the name field to the user's full name
    }

    let orderId = "COS00001"; // Initialize the orderId variable with a default value

    const lastOrder = await Order.findOne().sort({Date: -1}).limit(1); // Fetch the most recent order from the database and keep it in the lastOrder variable, limit(1) means that only one will be returned

    if (lastOrder != null) {
        const lastOrderId = lastOrder.orderId; // Get the orderId of the most recent order
        const lastOrderIdNumberString = lastOrderId.replace("COS", ""); // Remove the "COS" prefix from the orderId to get the numeric part
        const lastOrderIdNumber = parseInt(lastOrderIdNumberString); // Convert the numeric part of the orderId from a string to an integer
        const newOrderIdNumber = lastOrderIdNumber + 1; // Increment the numeric part of the orderId by 1 to generate a new orderId
        const newOrderIdNumberString = String(newOrderIdNumber).padStart(5, "0"); // Convert the new numeric part of the orderId back to a string and pad it with leading zeros to ensure it has a length of 5 characters
        orderId = "COS" + newOrderIdNumberString; // Concatenate the "COS" prefix with the new numeric part of the orderId to create the new orderId
    }

    try {
        let total = 0; // Initialize the total variable to keep track of the total price of the order
        let labelledTotal = 0; // Initialize the labelledTotal variable to keep track of the total labelled price of the order
        const products = []; // Initialize the products array to store the product information for each product in the order

        for (let i=0; i<orderInfo.products.length; i++) { // Loop through each product in the order information provided in the request body
            const item = await Product.findOne({productId: orderInfo.products[i].productId}); // Get the current product item from the order information
            if (item == null) { // If the product item is not found in the database, respond with a 404 Not Found status and an error message
                res.status(404).json({message: "Product with productId " + orderInfo.products[i].productId + " not found"});
                return;
            }
            if (item.isAvailable == false) { // If the product item is found in the database but is not available, respond with a 400 Bad Request status and an error message
                res.status(400).json({message: "Product with productId " + orderInfo.products[i].productId + " is not available"});
                return;
            }
            products[i] = { // If the product item is found in the database, create a new product object with the necessary information and add it to the products array
                productInfo: {
                    productId: item.productId,
                    name: item.name,
                    altNames: item.altNames,
                    description: item.description,
                    price: item.price,
                    labeledPrice: item.labeledPrice,
                    stock: item.stock,
                    images: item.images
                },
                quantity: orderInfo.products[i].quantity
            };
            total += item.price * orderInfo.products[i].quantity; // Update the total price of the order by adding the price of the current product multiplied by its quantity
            labelledTotal += item.labeledPrice * orderInfo.products[i].quantity; // Update the total labelled price of the order by adding the labelled price of the current product multiplied by its quantity
        }

        const order = new Order({ // Create a new order document using the order information from the request body and the generated orderId
        orderId: orderId,
        email: req.user.email,
        name: orderInfo.name,
        phone: orderInfo.phone,
        address: orderInfo.address,
        total: total,
        labelledTotal: labelledTotal,
        products: products
    });
        const createdOrder = await order.save();
        res.json({message: "Order created successfully", order: createdOrder}); // Save the new order document to the database and respond with a success message and the created order object  
    } catch (error) {
        res.status(500).json({message: "Error creating order", error: error});
    }
}