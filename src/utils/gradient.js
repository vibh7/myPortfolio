const darkVibrantGradients = [
  "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",           // Dark Purple Blue
  "linear-gradient(135deg, #1f1c2c, #928DAB)",                    // Gray Purple
  "linear-gradient(135deg, #000428, #004e92)",                    // Deep Blue
  "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",           // Purple → Pink → Gold
  "linear-gradient(135deg, #141e30, #243b55)",                    // Navy Steel
  "linear-gradient(135deg, #16222A, #3A6073)",                    // Blue Gray Deep
  "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",           // Teal Steel
  "linear-gradient(135deg, #200122, #6f0000)",                    // Dark Red Violet
  "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",            // Royal Blue → Red → Orange
  "linear-gradient(135deg, #000000, #434343)",                    // Ultra-dark Chrome
  "linear-gradient(135deg, #232526, #414345)",                    // Carbon Smoke
  "linear-gradient(135deg, #141E30, #243B55)",                    // Deep Midnight
  "linear-gradient(135deg, #240b36, #c31432)",                    // Dark Purple → Red
];

export function generateGradient(input) {
  return darkVibrantGradients[
    Math.floor(Math.random() * darkVibrantGradients.length)
  ];
}
