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
    this._displayCalorieProgress();
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
    const progressEl = document.getElementById('calorie-progress');

    const remaining = this._calorieLimit - this._totalCalories;

    if(remaining <= 0){
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light')
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger')
    }
    else{
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light')
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
      progressEl.classList.remove('bg-danger')
    }
    caloriesRemainingEl.innerHTML = remaining;
  }
  _displayCalorieProgress(){
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  // Render Methods to render data manually...
  _render(){
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
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

console.log(tracker._displayCalorieProgress())