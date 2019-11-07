import React from 'react';
import classes from './Order.module.css';

const order = (props)=>{
  const ingredients = [];
  for (let ingredientName in props.ingredients){
    // props.ingredients->{Bacon:0, ..., ..., ...}
    // ingredientName->Bacon
    ingredients.push({name:ingredientName, amount:props.ingredients[ingredientName]});
  }
  // ingredients->[{name:,amount:},{...},]
  const ingredientOutput=ingredients.map(ig=>{
    return(<span style={{display:'inline-block',
      margin:'0 8px',
      border:'1px solid #ccc',
      padding:'5px'
    }}
      key={ig.name}>{ig.name}:{ig.amount} </span>)
  })
  return(
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
