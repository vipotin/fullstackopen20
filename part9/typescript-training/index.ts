import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    console.log(!isNaN(height) && !isNaN(weight));

    if (!height || !weight ) throw new Error('missing parameters');

    if (!isNaN(height) && !isNaN(weight)) {
      const bmi = calculateBmi(height, weight);
      res.send({
        weight,
        height,
        bmi 
      });
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error) {
    res.status(400).send(error.message).end();
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exercises: any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = req.body.target;

    if (!exercises || !target ) throw new Error('missing parameters');

    if (!exercises.some(isNaN) && !isNaN(Number(target))) {
      const result = calculateExercises(exercises, target);
      res.json(result);
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error) {
    res.status(400).send(error.message).end();
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});