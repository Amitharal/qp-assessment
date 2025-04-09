import { Request, Response } from "express";
import connection from "../config/config";

// View grocery items
export const viewGroceryItems = async (_req: Request, res: Response): Promise<any> => {
  try {
    const [rows] = await connection.execute("SELECT * FROM groceries");
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching grocery items", error });
  }
};

// Place order
export const placeOrder = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.body;

  try {
    const [itemResult]: any = await connection.execute("SELECT * FROM groceries WHERE id = ?", [id]);
    const groceryItem = itemResult[0];

    if (!groceryItem) {
      return res.status(404).json({ message: "Grocery item not found" });
    }

    const total_price = groceryItem.price;

    await connection.execute(
      "INSERT INTO orders (id, total_price) VALUES (?, ?)",
      [id, total_price]
    );

    return res.status(201).json({ id,total_price });
  } catch (error) {
    return res.status(500).json({ message: "Error placing order", error });
  }
};
