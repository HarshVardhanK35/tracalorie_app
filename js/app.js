// ---------------------- Part - 01 ----------------------
class CalorieTracker {
  constructor(){
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesTotal()
  }

  // Public Methods...
  addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    this._render()
  }
  addWorkout(workout){
    this._Workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._render()
  }

  // ---------------------- Part - 02 ----------------------
  // Private Methods
  _displayCaloriesTotal(){
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _render(){
    this._displayCaloriesTotal()
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

// Created a new instance of CalorieTracker() object
const tracker = new CalorieTracker();

// Created a new Instance of Meal()
const breakfast = new Meal('Breakfast', 300);
tracker.addMeal(breakfast);

// Created a new Instance of Workout()
const pushups = new Workout('pushups', 200);
tracker.addWorkout = pushups;