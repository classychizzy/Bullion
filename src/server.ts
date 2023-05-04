import express from 'express';
import { IndexRouter } from './controller/v0/router'
import cors from 'cors'


export const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/v0/', IndexRouter);

app.get('/', (req, res) => {
  res.send('Hello and welcome to the Pepper Inventory!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});