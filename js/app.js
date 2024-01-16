// ---------------------- Part - 01 ----------------------
class CalorieTracker {
  constructor(){
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCalorieLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  // Public Methods...
  addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    this._render()
  }
  addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._render()
  }

  // ---------------------- Part - 02 ----------------------
  // Private Methods
  _displayCaloriesTotal(){
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }
  _displayCalorieLimit(){
    const calorieLimitEl = document.getElementById('calories-limit')
    calorieLimitEl.innerHTML = this._calorieLimit;
  }
  _displayCaloriesConsumed(){
    const calorieConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce((total, meal) => {
      return (total + meal.calories)
    }, 0);
    calorieConsumedEl.innerHTML = consumed;
  }
  _displayCaloriesBurned(){
    const calorieBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce((total, workout) => {
      return (total + workout.calories)
    }, 0);
    calorieBurnedEl.innerHTML = burned;
  }
  _displayCaloriesRemaining(){
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
  }

  // Render Methods to render data manually...
  _render(){
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
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
const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);

// Created a new Instance of Workout()
const pushups = new Workout('pushups', 320);
tracker.addWorkout(pushups);
tracker.addWorkout(running);

console.log(tracker._workouts)