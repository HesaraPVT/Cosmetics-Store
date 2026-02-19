import express from "express"
import { getProducts, saveProduct } from "../controllers/productController.js";
import { deleteProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.post('/', saveProduct);

productRouter.delete('/:productId', deleteProduct); // :productId is a route parameter that will be used to identify the product to be deleted

export default productRouter;