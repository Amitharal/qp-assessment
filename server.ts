import express from "express";
const app = express();
app.use(express.json());
import adminRoutes from './src/routes/adminroutes';
import userRoutes from './src/routes/userroutes';
import mysql from 'mysql2';
import {Request,Response} from "express";
import  pool  from "./src/config/config";
import dotenv from 'dotenv';

dotenv.config();
// Use routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.PORT || '3306'), // Ensures the port is numeric
});



app.get('/test', (req:Request, res:Response)=>{
  connection.query('SELECT * FROM groceries', (err, rows) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the rows as JSON
      res.json(rows);
    }
  });
})