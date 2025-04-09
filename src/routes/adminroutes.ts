import { Router } from "express";
import { addGroceryItem, removeGroceryItem, updateGroceryItem, viewAllGroceryItems } from "../controllers/adminController";

const router = Router();

// Admin routes
router.post("/add", addGroceryItem);
router.put("/update/:id", updateGroceryItem);
router.delete("/remove/:id", removeGroceryItem);
router.get("/view", viewAllGroceryItems);

export default router;
