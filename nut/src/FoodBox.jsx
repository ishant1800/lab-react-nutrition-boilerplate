import React from 'react'
import data from './resources/FoodData'
import './FoodBox.css'
import { useState } from 'react'

function FoodBox() {
  let foodItems=data.map((foodItem)=>({...foodItem,count:0,Tcal:0}))
  const [foodState, setFoodState] = useState(foodItems)
  const [searchInput,setSearchInput]=useState('')

  const passInputValue=(e,id)=>{
    let inputValue=parseInt(e.target.value)>=0?e.target.value:" "
    let newState= foodState.map((item)=>item.id===id?{...item,count:inputValue}:item)
    setFoodState(newState)
  }

  const calcCalories=(id)=>{
    let newState=foodState.map((item)=>item.id===id?{...item,Tcal:item.count*item.cal}:item)
    setFoodState(newState)
  }

  const resetFoodState=(id)=>{
    let newState=foodState.map((item)=>item.id===id?{...item,count:0,Tcal:0}:item)
    setFoodState(newState)
  }

  const passSearchInput=(e)=>{
    let inputpassed=e.target.value
    setSearchInput(inputpassed)
  }
  return (<div>
    <div id="searchDiv">
      <h3>Search</h3>
    <input type="search" onChange={passSearchInput} defaultValue={searchInput} placeholder="search for food"/>
    </div>
      <div>
        {foodState.filter((item)=>item.name.startsWith(searchInput))
          .map(item=>(<div key={item.id} id="container"><div className="box" key={item.id}>
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={item.img} />
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
                  <input className="input" type="number" min="0" onChange={(e)=>passInputValue(e,item.id)} value={item.count>0?item.count:""} placeholder="Enter a number here" />
                </div>
                <div className="control">
                  <button onClick={()=>calcCalories(item.id)} className="button is-info">
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div id="resetInfocontainer">
          <p> <strong> {item.count} pizza = {item.Tcal} calories</strong> </p>
          <button className="reset" onClick={()=>resetFoodState(item.id)} >Reset</button>
        </div>
        </div>
          ))}
      </div>
      </div>
  )
}


export default FoodBox
