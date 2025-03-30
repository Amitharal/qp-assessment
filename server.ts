import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// A simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
