import React, { useState } from 'react';
import data from '../resources/FoodData';
import './FoodBox.css';

function FoodBox() {
  const [foods, setFoods] = useState(data);
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e, id) => {
    const inputValue = parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : 0;
    const updatedFoods = foods.map(food => (food.id === id ? { ...food, count: inputValue } : food));
    setFoods(updatedFoods);
  };

  const calculateCalories = id => {
    const updatedFoods = foods.map(food =>
      food.id === id ? { ...food, Tcal: food.count * food.cal } : food
    );
    setFoods(updatedFoods);
  };

  const resetFoodState = id => {
    const updatedFoods = foods.map(food => (food.id === id ? { ...food, count: 0, Tcal: 0 } : food));
    setFoods(updatedFoods);
  };

  const handleSearchInputChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div id="searchDiv">
        <h3>Search</h3>
        <input
          type="search"
          onChange={handleSearchInputChange}
          value={searchInput}
          placeholder="Search for food"
        />
      </div>
      <div>
        {foods
          .filter(food => food.name.toLowerCase().includes(searchInput.toLowerCase()))
          .map(item => (
            <div key={item.id} className="container">
              <div className="box">
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={item.img} alt={item.name} />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{item.name}</strong> <br />
                        <small>{item.cal} cal</small>
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
                          onChange={e => handleInputChange(e, item.id)}
                          value={item.count || ''}
                          placeholder="Enter a number here"
                        />
                      </div>
                      <div className="control">
                        <button onClick={() => calculateCalories(item.id)} className="button is-info">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div className="reset-info-container">
                <p>
                  <strong>
                    {item.count} {item.name} = {item.Tcal} calories
                  </strong>
                </p>
                <button className="reset" onClick={() => resetFoodState(item.id)}>
                  Reset
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FoodBox;
