interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface RatingData {
  rating: number;
  ratingDescription: string;
}

// interface UserData {
//   target: number;
//   results: number[];
// }

// const parseExerciseArguments = (args: string[]): UserData => {
//   if (args.length < 4) throw new Error('Arguments are missing');
//   const target = Number(args[2]);
//   if (isNaN(target)) {
//     throw new Error('Only numbers are allowed');
//   }
//   const onlyResults = args.slice(2);
//   const results = onlyResults.map(input => {
//     if (isNaN(Number(input))) {
//       throw new Error('Only numbers are allowed');
//     }
//     return Number(input);
//   });

//   return { target, results };
// };

const calculateRating = (avgTime: number, target: number): RatingData => {
  const ratingValue = avgTime/target;
  switch(true) {
    case ratingValue < 0.9 && ratingValue >= 0.5:
      return { 
        rating: 2, 
        ratingDescription: `You didn't reach your target but keep up with your exercises`};
    case ratingValue >= 0.9:
      return { 
        rating: 3, 
        ratingDescription: `Excellent! You did very well this exercising period!`};
    default:
      return { 
        rating: 1, 
        ratingDescription: `Try to lower your target for next period. Even small amounts of exercise per day will help you get there.`};
  }
};

export const calculateExercises = (exerciseHours: number[], target: number): ExerciseData => {

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.map(h => h > 0).length;
  const average = (exerciseHours.reduce((acc, current) => acc + current))/exerciseHours.length;
  const success = average > target ? true : false;
  const { rating, ratingDescription } = calculateRating(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export const exerciseCalculator = (exerciseHours: number[], target: number): ExerciseData => {
  try {
    //const data = parseExerciseArguments(process.argv);
    const feedback = calculateExercises(exerciseHours, target);
    return feedback;
  } catch (error) {
      throw new Error(error.message);
  }
};

