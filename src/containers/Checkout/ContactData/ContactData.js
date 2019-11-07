import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';


class ContactData extends Component {
  state={
    name:'',
    email:'',
    address:{
      street:'',
      postalCode:''
    },
    loading:false

  }
  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({loading:true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Max',
        address:{
          street:'Teststreet 1',
          zipCode:'123',
          country:'Germany'
        },
        email:'test@test.com'
      }

    }
    axios.post('/orders.json', order)
    .then(response=>{

      this.setState({loading: false});

      this.props.history.push('/');
    })
    .catch(error=>{
      this.setState({loading:false})
    });
  }

  render(){
    let form =(
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"></input>
        <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

    </form>);
    if (this.state.loading){
      form = <Spinner/>;
    }
    return(
      <div className={classes.ContactData}>
        <h4>
          Enter your info
        </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
