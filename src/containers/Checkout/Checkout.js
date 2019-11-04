import React, {Component} from 'react';
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
    console.log(this.props);
    const query= new URLSearchParams(this.props.location.search);
    const ingredients={};
    for (let param of query.entries(){} 

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
        </div>
    );
  }
}

export default Checkout;
