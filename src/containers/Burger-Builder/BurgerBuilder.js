import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  Salad:0.5,
  Cheese:0.4,
  Meat: 1.3,
  Bacon:0.7
}

class BurgerBuilder extends Component {
  // constructor(prop){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients:{
      Salad: 0,
      Bacon:0,
      Cheese:0,
      Meat:0
    },
    purchasable:false,
    purchasing:false,
    totalPrice:4
  }

  purchaseHandler=()=>{
    this.setState({purchasing:true});
  }
  updatePurchaseState(ingredients){

    const sum = Object.keys(ingredients)
    .map(igKey=>{return(
      ingredients[igKey]
    )})
    .reduce((sum,el)=>{
      return sum + el;
    },0);
    this.setState({purchasable: sum > 0});
  }
  PurchaseCancel=()=>{
    this.setState({purchasing:false});
  }

  addIngredientHandler=(type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);

  }
  removeIngredientHandler=(type)=>{
    const oldCount = this.state.ingredients[type];
    if (oldCount <=0){
      return ;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }
  render(){
    const disabledInfo={
      ...this.state.ingredients
    };
    for (let key in disabledInfo){

      disabledInfo [key] = disabledInfo[key]<=0;
      console.log(disabledInfo [key]);
    }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.PurchaseCancel}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable = {this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;
