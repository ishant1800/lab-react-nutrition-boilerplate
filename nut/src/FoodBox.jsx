import React, { useState } from 'react';
import foodData from './resources/FoodData';
import './FoodBox.css';

function FoodBox() {
  // Initialize food items with count and total calories
  const initialFoods = foodData.map(food => ({ ...food, count: 0, totalCalories: 0 }));
  const [foods, setFoods] = useState(initialFoods);
  const [searchInput, setSearchInput] = useState('');

  // Update count of a food item
  const updateCount = (e, id) => {
    const inputValue = parseInt(e.target.value) >= 0 ? e.target.value : " ";
    const updatedFoods = foods.map(food => (food.id === id ? { ...food, count: inputValue } : food));
    setFoods(updatedFoods);
  };

  // Calculate total calories for a food item
  const calculateCalories = (id) => {
    const updatedFoods = foods.map(food => (food.id === id ? { ...food, totalCalories: food.count * food.calories } : food));
    setFoods(updatedFoods);
  };

  // Reset count and total calories for a food item
  const resetFoodItem = (id) => {
    const updatedFoods = foods.map(food => (food.id === id ? { ...food, count: 0, totalCalories: 0 } : food));
    setFoods(updatedFoods);
  };

  // Update search input value
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div id="searchDiv">
        <h3>Search</h3>
        <input
          type="search"
          onChange={handleSearchInput}
          value={searchInput}
          placeholder="Search for food"
        />
      </div>
      <div>
        {foods.filter(food => food.name.toLowerCase().includes(searchInput.toLowerCase())).map(food => (
          <div key={food.id} id="container">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={food.img} alt={food.name} />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{food.name}</strong> <br />
                      <small>{food.calories} cal</small>
                    </p>
                  </div>
                </div>
                <div className="media-right">
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        min="0"
                        onChange={(e) => updateCount(e, food.id)}
                        value={food.count > 0 ? food.count : ""}
                        placeholder="Enter a number here"
                      />
                    </div>
                    <div className="control">
                      <button onClick={() => calculateCalories(food.id)} className="button is-info">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div id="resetInfocontainer">
              <p>
                <strong>{food.count} pizza = {food.totalCalories} calories</strong>
              </p>
              <button className="reset" onClick={() => resetFoodItem(food.id)}>Reset</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodBox;
