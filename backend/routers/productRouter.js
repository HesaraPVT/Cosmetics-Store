import express from "express"
import { getProducts, saveProduct, deleteProduct, updateProduct, getProductById } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.post('/', saveProduct);

productRouter.delete('/:productId', deleteProduct); // :productId is a route parameter that will be used to identify the product to be deleted

productRouter.put('/:productId', updateProduct); // :productId is a route parameter that will be used to identify the product to be updated

productRouter.get('/:productId', getProductById); // :productId is a route parameter that will be used to identify the product to be retrieved

export default productRouter;