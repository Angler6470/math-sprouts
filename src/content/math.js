// src/content/math.js
export const pack = {
  id: 'math',
  type: 'math',
  title: 'Math Sprouts',
  modes: [
    { key: 'balance', label: 'Balance' },
    { key: 'garden', label: 'Grow' },
    { key: 'pollinator', label: 'Helpers' }
  ],
  themes: ['garden', 'ocean', 'space'],
  difficulties: ['beginner', 'intermediate', 'advanced'],

  // Math problems are procedurally generated, but we define the problem types here
  problemTypes: {
    beginner: {
      addition: { max: 10, description: 'Add numbers up to 10' },
      subtraction: { max: 10, description: 'Subtract numbers up to 10' },
      multiplication: { max: 5, description: 'Multiply by numbers up to 5' }
    },
    intermediate: {
      addition: { max: 50, description: 'Add numbers up to 50' },
      subtraction: { max: 50, description: 'Subtract numbers up to 50' },
      multiplication: { max: 10, description: 'Multiply by numbers up to 10' },
      division: { max: 10, description: 'Divide by numbers up to 10' }
    },
    advanced: {
      addition: { max: 100, description: 'Add numbers up to 100' },
      subtraction: { max: 100, description: 'Subtract numbers up to 100' },
      multiplication: { max: 12, description: 'Multiply by numbers up to 12' },
      division: { max: 12, description: 'Divide by numbers up to 12' }
    }
  },

  // Word problem templates organized by theme and difficulty
  wordProblems: {
    garden: {
      beginner: [
        { template: 'If you plant {n1} seeds and {n2} more seeds, how many total?', operation: 'add', theme: 'planting' },
        { template: 'You have {n1} flowers. {n2} wilt. How many are left?', operation: 'subtract', theme: 'flowers' },
        { template: 'Each plant needs {n2} glasses of water. For {n1} plants, how many glasses total?', operation: 'multiply', theme: 'watering' }
      ],
      intermediate: [
        { template: 'A garden has {n1} rows with {n2} plants in each row. How many plants total?', operation: 'multiply', theme: 'garden layout' },
        { template: '{n1} butterflies visit {n2} more flowers. How many flowers visited total?', operation: 'add', theme: 'pollinators' },
        { template: 'You harvest {n1} tomatoes and give away {n2}. How many remain?', operation: 'subtract', theme: 'harvest' }
      ],
      advanced: [
        { template: 'A garden produces {n1} vegetables. This is {n2} times last year\'s amount. How many last year?', operation: 'divide', theme: 'production' },
        { template: 'You spend $' + '{n1} on seeds and $' + '{n2} on soil. Your total budget is $100. How much left?', operation: 'subtract', theme: 'gardening budget' }
      ]
    },
    ocean: {
      beginner: [
        { template: 'You see {n1} fish and then {n2} more fish. How many total?', operation: 'add', theme: 'fish counting' },
        { template: 'There are {n1} starfish. {n2} hide in rocks. How many are visible?', operation: 'subtract', theme: 'starfish' },
        { template: 'Each crab has {n2} legs. For {n1} crabs, how many legs total?', operation: 'multiply', theme: 'crabs' }
      ],
      intermediate: [
        { template: 'A fish tank has {n1} gallons. You add {n2} more gallons. What is the total capacity?', operation: 'add', theme: 'tank capacity' },
        { template: '{n1} sea turtles swim to the beach. {n2} return to the ocean. How many on the beach?', operation: 'subtract', theme: 'turtles' },
        { template: 'An aquarium has {n1} tanks with {n2} fish each. How many fish total?', operation: 'multiply', theme: 'aquarium' }
      ],
      advanced: [
        { template: 'A boat travels {n1} miles per hour for {n2} hours. How many miles total?', operation: 'multiply', theme: 'boat travel' },
        { template: 'You collect {n1} shells and divide them equally into {n2} groups. How many in each group?', operation: 'divide', theme: 'shells' }
      ]
    },
    space: {
      beginner: [
        { template: 'You see {n1} stars and then {n2} more appear. How many total?', operation: 'add', theme: 'stars' },
        { template: 'There are {n1} planets. {n2} are very far away. How many are close?', operation: 'subtract', theme: 'planets' },
        { template: 'Each rocket holds {n2} astronauts. For {n1} rockets, how many astronauts total?', operation: 'multiply', theme: 'astronauts' }
      ],
      intermediate: [
        { template: 'A spacecraft travels {n1} miles and then {n2} more miles. Total distance traveled?', operation: 'add', theme: 'space travel' },
        { template: 'A space station has {n1} modules. {n2} are under repair. How many working?', operation: 'subtract', theme: 'space station' },
        { template: 'A satellite orbits {n1} times per day for {n2} days. How many orbits total?', operation: 'multiply', theme: 'satellite' }
      ],
      advanced: [
        { template: 'Light travels {n1} million miles per second for {n2} seconds. How far total?', operation: 'multiply', theme: 'light speed' },
        { template: 'A rocket uses {n1} gallons of fuel. It can be divided into {n2} tanks. How many gallons per tank?', operation: 'divide', theme: 'fuel' }
      ]
    }
  }
};

// Extract named exports for App.js
export const MATH_PROBLEM_TYPES = pack.problemTypes;
export const MATH_WORD_PROBLEMS = pack.wordProblems;
export const MATH_MODES = pack.modes;
