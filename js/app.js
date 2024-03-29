class CalorieTracker {
  constructor(){
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCalorieLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();

    document.getElementById('limit').value = this._calorieLimit;
  }

  // Public Methods...
  addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    Storage.updateTotalCalories(this._totalCalories)
    Storage.saveMeal(meal)

    this._displayNewMeal(meal);
    this._render()
  }

  addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    Storage.updateTotalCalories(this._totalCalories)
    Storage.saveWorkout(workout)

    this._displayNewWorkout(workout)
    this._render()
  }

  removeMeal(id){
    // if condition (meal.id === id) is not matched then result is -1 otherwise it going to be the actual index
    const index = this._meals.findIndex((meal) => {
      return meal.id === id
    })
    if(index !== -1){
      const meal = this._meals[index]
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalories(this._totalCalories)
      this._meals.splice(index, 1)
      Storage.removeMeal(id)
      this._render()
    }
  }

  removeWorkout(id){
    // if condition (workout.id === id) is not matched then result is -1 otherwise it going to be the actual index
    const index = this._workouts.findIndex((workout) => {
      return workout.id === id
    })
    if(index !== -1){
      const workout = this._workouts[index]
      this._totalCalories += workout.calories;
      Storage.updateTotalCalories(this._totalCalories)
      this._workouts.splice(index, 1)
      Storage.removeWorkout(id)
      this._render()
    }
  }

  reset(){
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  setLimit(calorieLimit){
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit)
    this._displayCalorieLimit()
    this._render()
  }

  loadItems() {
    this._meals.forEach(meal => this._displayNewMeal(meal))
    this._workouts.forEach(workout => this._displayNewWorkout(workout))
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

  _displayNewMeal(meal){
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');

    mealEl.classList.add('card', 'my-2')
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML =
    `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
      </div>
    </div>
    `
    mealsEl.appendChild(mealEl)
  }

  _displayNewWorkout(workout){
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');

    workoutEl.classList.add('card', 'my-2')
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML =
    `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
      </div>
    </div>
    `
    workoutsEl.appendChild(workoutEl)
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

// class App{
  // ----------------------------------- Refactored the code with DRY --------------------------------------
  //   constructor(){
//     this._tracker = new CalorieTracker();
//     document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this)) //--- here 'this' keyword refers to the element that the event is on
//     // but here we must have to make 'this' must pertain to the app that we initialize, so we have to bind this

//     this._tracker = new CalorieTracker();
//     document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this))
//   }

//   _newMeal(e){
//     e.preventDefault();

//     const name = document.getElementById('meal-name');
//     const calories = document.getElementById('meal-calories');

//     // validate the inputs
//     if(name.value === '' || calories.value === ''){
//       alert('please fill in all fields!!!')
//     }

//     const meal = new Meal(name.value, +calories.value)
//     this._tracker.addMeal(meal);

//     // reset the input boxes
//     name.value = ''
//     calories.value = ''

//     // Close the bootstrap forms after entering the new meals
//     const collapseMeal = document.getElementById('collapse-meal')
//     const bsCollapse = new bootstrap.Collapse(collapseMeal, {
//       toggle: true
//     })
//   }

//   _newWorkout(e){
//     e.preventDefault();

//     const name = document.getElementById('workout-name');
//     const calories = document.getElementById('workout-calories');

//     // validate the inputs
//     if(name.value === '' || calories.value === ''){
//       alert('please fill in all fields!!!')
//     }

//     const workout = new Workout(name.value, +calories.value)
//     this._tracker.addWorkout(workout);

//     // reset the input boxes
//     name.value = ''
//     calories.value = ''

//     // Close the bootstrap forms after entering the new workouts
//     const collapseWorkout = document.getElementById('collapse-workout')
//     const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
//       toggle: true
//     })
//   }
// }

class Storage{
  // we do not need multiple instances of storage (there is only one entity)
  static getCalorieLimit(defaultLimit = 2000){
    let calorieLimit;
    if(localStorage.getItem('calorieLimit') === null){
      calorieLimit = defaultLimit
    }
    else{
      calorieLimit = +localStorage.getItem('calorieLimit')
    }
    return calorieLimit
  }
  static setCalorieLimit(calorieLimit){
    localStorage.setItem('calorieLimit', calorieLimit)
  }

  static getTotalCalories(defaultCalories = 0){
    let totalCalories;
    if(localStorage.getItem('totalCalories') === null){
      totalCalories = defaultCalories
    }
    else{
      totalCalories = +localStorage.getItem('totalCalories')
    }
    return totalCalories
  }
  static updateTotalCalories(calories){
    localStorage.setItem('totalCalories', calories)
  }

  static getMeals(){
    let meals;
    if(localStorage.getItem('meals') === null){
      meals = []
    }
    else{
      meals = JSON.parse(localStorage.getItem('meals'))
    }
    return meals
  }
  static saveMeal(meal){
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals))
  }
  static removeMeal(id){
    const meals = Storage.getMeals();
    meals.forEach((meal, index)=>{
      if(meal.id === id){
        meals.splice(index, 1)
      }
    })
    localStorage.setItem('meals', JSON.stringify(meals))
  }

  static getWorkouts(){
    let workouts;
    if(localStorage.getItem('workouts') === null){
      workouts = []
    }
    else{
      workouts = JSON.parse(localStorage.getItem('workouts'))
    }
    return workouts
  }
  static saveWorkout(workout){
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts))
  }
  static removeWorkout(id){
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index)=>{
      if(workout.id === id){
        workouts.splice(index, 1)
      }
    })
    localStorage.setItem('workouts', JSON.stringify(workouts))
  }

  static clearAll(){
    localStorage.removeItem('totalCalories')
    localStorage.removeItem('meals')
    localStorage.removeItem('workouts')
    location.reload()
  }
}

class App{
  // ----------------------- Created class App{} another time for not to repeat same code for both meal and workout
  constructor(){
    this._tracker = new CalorieTracker();
    this._loadEventListeners()
    this._tracker.loadItems()
  }

  _loadEventListeners(){
    // Adding Items
    document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal')) //--- here 'this' keyword refers to the element that the event is on
    // but here we must have to make 'this' must pertain to the app that we initialize, so we have to bind this
    document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'))

    // Removing Items
    document.getElementById('meal-items').addEventListener('click', this._removeItems.bind(this, 'meal'))
    document.getElementById('workout-items').addEventListener('click', this._removeItems.bind(this, 'workout'))

    // Filtering Items
    document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'))
    document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'))

    // Reset
    document.getElementById('reset').addEventListener('click', this._reset.bind(this));

    // Set Calorie Limit
    document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this))
  }

  _newItem(type, e){
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // validate the inputs
    if(name.value === '' || calories.value === ''){
      alert('please fill in all fields!!!')
    }

    if(type === 'meal'){
      const meal = new Meal(name.value, +calories.value)
      this._tracker.addMeal(meal);
    }
    else{
      const workout = new Workout(name.value, +calories.value)
      this._tracker.addWorkout(workout);
    }

    // ----------------------- reset the input boxes -----------------------
    name.value = ''
    calories.value = ''

    // ----------------------- Close the bootstrap forms after entering the new meals
    const collapseItem = document.getElementById(`collapse-${type}`)
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true
    })
  }

  _removeItems(type, e){
    if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
      if(confirm('Are you sure you want to delete?')){
        const id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');

        type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)

        e.target.parentElement.parentElement.parentElement.parentElement.remove()
      }
    }
  }

  _filterItems(type, e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card `).forEach((item)=>{
      const name = item.firstElementChild.firstElementChild.textContent;
      if(name.toLowerCase().indexOf(text) !== -1){
        item.style.display = 'block'
      }
      else{
        item.style.display = 'none'
      }
    });
  }

  _reset(e){
    this._tracker.reset()
    document.getElementById('meal-items').innerHTML = ''
    document.getElementById('workout-items').innerHTML = ''
    document.getElementById('filter-meals').value = ''
    document.getElementById('filter-workouts').value = ''
  }

  _setLimit(e){
    e.preventDefault()
    const limit = document.getElementById('limit');

    if(limit.value === ''){
      alert('Please add a limit!!!')
    }

    this._tracker.setLimit(+limit.value);
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide()
  }
}

const app = new App();