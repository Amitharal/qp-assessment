import { Request, Response } from "express";
import connection from "../config/config";

// Add a new grocery item
export const addGroceryItem = async (req: Request, res: Response): Promise<any> => {
  const {id, name, price, qty } = req.body;

  try {
    const [result] = await connection.execute(
      "INSERT INTO groceries (id,name, qty,price ) VALUES (?, ?, ?,?)",
      [id,name,qty, price]
    );
    return res.status(201).json({ id: (result as any).insertId,name, qty,price });
  } catch (error) {
    return res.status(500).json({ message: "Error adding grocery item", error });
  }
};

// View all grocery items
export const viewAllGroceryItems = async (_req: Request, res: Response): Promise<any> => {
  try {
    const [rows] = await connection.execute("SELECT * FROM groceries");
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching grocery items", error });
  }
};

// Update grocery item
export const updateGroceryItem = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    await connection.execute(
      "UPDATE groceries SET name = ?, price = ? WHERE id = ?",
      [name, price, id]
    );
    return res.json({ id, name, price });
  } catch (error) {
    return res.status(500).json({ message: "Error updating grocery item", error });
  }
};

// Remove grocery item
export const removeGroceryItem = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    await connection.execute("DELETE FROM groceries WHERE id = ?", [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error removing grocery item", error });
  }
};
