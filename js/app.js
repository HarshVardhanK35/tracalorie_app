class CalorieTracker {
  constructor(){
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
  }

  // Public Methods...
  addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;
  }
  addWorkout(workout){
    this._Workouts.push(workout);
    this._totalCalories -= workout.calories;
  }
}

class Meal {
  constructor(name, calories){
    // Generating a random ID by making HexaDecimal and removing the 1st two indices(0 & .)
    this.id = Math.random().toString(16).slice(2)
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories){
    // Generating a random ID by making HexaDecimal and removing the 1st two indices(0 & .)
    this.id = Math.random().toString(16).slice(2)
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();
const breakfast = new Meal('Breakfast', 300);
tracker.addMeal(breakfast);
const pushups = new Workout('pushups', 200);
tracker.addWorkout = pushups;

