interface BmiValues {
  height: number,
  weight: number
}

const parseArguments = (args: string[]) : BmiValues => {
  if (args.length < 4) throw new Error('Arguments are missing');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    } 
  } else {
      throw new Error('Only numbers are allowed');
    }
}

const calculateBmi = (height: number, weight: number) : string => {
  const bmi: number = weight/((height/100)^2);

  switch(true) {
    case (bmi <= 15):
      return 'Very severely underweight';
    case (15 <= bmi && bmi < 16):
      return 'Severely underweight';
    case (16 <= bmi && bmi <= 18.5):
      return 'Underweight';
    case (18.5 <= bmi && bmi < 25):
      return 'Normal (healthy weight)';
    case (25 <= bmi && bmi < 30):
      return 'Overweight';
    case (30 <= bmi && bmi < 35):
      return 'Obese Class I (Moderately obese)';
    case (35 <= bmi && bmi < 40):
      return 'Obese Class II (Severely obese)';
    case (bmi >= 40):
      return 'Obese Class III (Very severely obese)'
    default:
      throw new Error('Calculating bmi failed');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(bmi);
} catch (error) {
  console.log('Error: ', error.message);
}