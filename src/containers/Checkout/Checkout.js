import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';



class Checkout extends Component{
  state = {
      ingredients: {
          Salad: 1,
          Meat: 1,
          Cheese: 1,
          Bacon: 1
      }
  }
  componentDidMount(){

    const query= new URLSearchParams(this.props.location.search);
    const ingredients={};
    console.log(query.entries());
    for (let param of query.entries()){
      ingredients[param[0]]=+param[1];
    }
    this.setState({ingredients})
  }

  checkoutCancelledHandler= ()=>{
    this.props.history.goBack();
  }
  checkoutContinuedHandler = ()=>{
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return (
        <div>
            <CheckoutSummary
              onCheckoutCancelled={this.checkoutCancelledHandler}
              onCheckoutContinue={this.checkoutContinuedHandler}
              ingredients={this.state.ingredients}/>
            <Route path={this.props.match.path+'/contact-data'}></Route>

        </div>
    );
  }
}

export default Checkout;
