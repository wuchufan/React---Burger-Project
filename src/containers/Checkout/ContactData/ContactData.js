import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Name'
        },
        value:''
      },
      street: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Street'
        },
        value:''
      },
      zipCode:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Zip code'
        },
        value:''
      },
      country: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Country'
        },
        value:''
      },
      email: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Mail'
        },
        value:''
      },
      deliveryMethod:{
        elementType:'select',
        elementConfig:{
        options:[{value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}]
        },
        value:""
      }
    },


    loading: false
  }



orderHandler = (event) => {
  event.preventDefault();
  this.setState({loading: true});
  const order = {
    ingredients: this.props.ingredients,
    price: this.props.price
  }
  axios.post('/orders.json', order).then(response => {
    this.setState({loading: false});

    this.props.history.push('/');
  }).catch(error => {
    this.setState({loading: false})
  });
}

inputChangedHandler=(event, inputIdentifier)=>{
  const updatedOrderForm={
    ...this.state.orderForm
  };
  const updatedFormElement= {...updatedOrderForm[inputIdentifier]};
  //updatedOrderForm[inputIdentifier]->name etc
  updatedFormElement.value = event.target.value;
  updatedOrderForm[inputIdentifier]=updatedFormElement;
  this.setState({orderForm:updatedOrderForm});

}

render() {
  const formElementsArray=[];
  for (let key in this.state.orderForm){
    //key->name, address ,...
    formElementsArray.push({
      id:key,
      config:this.state.orderForm[key]
      //this.state.orderForm[key]-> {elementType:..., elementConfig:...,}
    });
  }

  let form = (<form>


    {formElementsArray.map(formElement=>(
      <Input
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
        key={formElement.id}></Input>
    ))}
    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

  </form>);
  if (this.state.loading) {
    form = <Spinner/>;
  }
  return (<div className={classes.ContactData}>
    <h4>
      Enter your info
    </h4>
    {form}
  </div>);
}
}

export default ContactData;
