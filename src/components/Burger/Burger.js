import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';


const burger = (props) =>{
  let transformedIngredients = Object.keys(props.ingredients) //["cheese","meat"]
  .map(igKey =>{
    return [...Array(props.ingredients[igKey])] //["cheese","meat"]->[[undefined,undefined],[..]]
    .map((_,index)=>{ return<BurgerIngredient key={igKey + index} type={igKey}/>
        });
  })//["cheese","meat"] -> [[<BurgerIngredient/>,<BurgerIngredient/>],..]
  .reduce((arr,el)=>{
    return arr.concat(el);
  },[]);

  if (transformedIngredients.length === 0){
    transformedIngredients = <p>Please start adding ingredients</p>

  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default burger;
