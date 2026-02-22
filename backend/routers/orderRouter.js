import express from "express";
import { createOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/', createOrder);

<<<<<<< HEAD:backend/routers/orderRouter.js
export default orderRouter;
=======
export default orderRouter;
>>>>>>> aabace302b75706cef5f910c7da0666560155008:routers/orderRouter.js
