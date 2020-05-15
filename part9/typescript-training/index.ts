import express from 'express';
const app = express();
import { bmiCalculator } from './bmiCalculator'


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get(`/bmi`, (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    console.log(!isNaN(height) && !isNaN(weight))
    if (!isNaN(height) && !isNaN(weight)) {
      const bmi = bmiCalculator(height, weight);
      res.send({
        weight,
        height,
        bmi 
      }) 
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error) {
    res.status(400).send(error.message).end();
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})