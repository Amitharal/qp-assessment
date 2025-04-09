import { Router } from "express";
import { placeOrder, viewGroceryItems } from "../controllers/userController";

const router = Router();

// User routes
router.get("/view", viewGroceryItems);
router.post("/order", placeOrder);

// Named export
export default router;