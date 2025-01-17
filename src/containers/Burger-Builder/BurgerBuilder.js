import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
    ingredients:null,
    purchasable:false,
    purchasing:false,
    loading:false,
    error:false,
    totalPrice:0
  }

  componentDidMount(){
    axios.get('https://react-my-burger-b096a.firebaseio.com/ingredients.json')
    .then(response=>{
      this.setState({ingredients:response.data});

    })
    .catch(error=>{
      this.setState({error:true});
    });
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
  PurchaseContinue = () =>{


    const queryParams=[];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i)+ '='+encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search:'?'+ queryString
    });

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

      disabledInfo[key] = disabledInfo[key]<=0;
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if (this.state.ingredients){
      burger = (
        <Aux>
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
      );
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        purchaseCancelled={this.PurchaseCancel}
        purchaseContinued={this.PurchaseContinue}
        ingredients={this.state.ingredients}/>
    }
    if (this.state.loading){
      orderSummary = <Spinner/>;
    }


    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.PurchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
        
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
