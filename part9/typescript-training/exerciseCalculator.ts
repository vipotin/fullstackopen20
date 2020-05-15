type ExerciseData = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
type RatingData = {
  rating: number,
  ratingDescription: string
}

const calculateRating = (avgTime: number, target: number) : RatingData => {
  const ratingValue = avgTime/target;
  switch(true) {
    case ratingValue < 0.9 && ratingValue >= 0.5:
      return { 
        rating: 2, 
        ratingDescription: `You didn't reach your target but keep up with your exercises`}
    case ratingValue >= 0.9:
      return { 
        rating: 3, 
        ratingDescription: `Excellent! You did very well this exercising period!`}
    default:
      return { 
        rating: 1, 
        ratingDescription: `Try to lower your target for next period. Even small amounts of exercise per day will help you get there.`}
  }
}

const calculateExercises = (exerciseHours: number[], target: number) : ExerciseData => {

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.map(h => h > 0).length;
  const average = (exerciseHours.reduce((acc, current) => acc + current))/exerciseHours.length;
  const success = average > target ? true : false;
  const { rating, ratingDescription } = calculateRating(average, target)
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] , 2))
