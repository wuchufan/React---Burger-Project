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
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      street: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Street'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      zipCode:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Zip code'
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:5
        },
        valid:false,
        touched:false
      },
      country: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Country'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      email: {
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Mail'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      deliveryMethod:{
        elementType:'select',
        elementConfig:{
        options:[{value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}]
        },
        value:"Fastest",
        valid:true

      }
    },

    formIsValid:false,
    loading: false
  }



orderHandler = (event) => {
  event.preventDefault();
  this.setState({loading: true});
  const formData = {};
  for (let formElementIdentifier in this.state.orderForm){
    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
  }
  console.log(formData);
  const order = {
    ingredients: this.props.ingredients,
    price: this.props.price,
    orderData: formData
  }
  axios.post('/orders.json', order).then(response => {
    this.setState({loading: false});

    this.props.history.push('/');
  }).catch(error => {
    this.setState({loading: false})
  });
}

checkValidity(value,rules){
  let isValid = true;
  if(!rules){
    return isValid
  }

  if (rules.required){
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength && isValid){
    isValid = value.length >= rules.minLength
  }

  if (rules.maxLength && isValid){
    isValid = value.length <= rules.maxLength
  }

  return isValid;
}

inputChangedHandler=(event, inputIdentifier)=>{
  const updatedOrderForm={
    ...this.state.orderForm
  };
  const updatedFormElement= {...updatedOrderForm[inputIdentifier]};
  //updatedOrderForm[inputIdentifier]->name etc
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
  updatedOrderForm[inputIdentifier]= updatedFormElement;
  updatedFormElement.touched= true;

  let formIsValid = true;
  for (let inputIdentifier in updatedOrderForm){
    //the logic for this line is that, as long as formIsValid turns to false, nothing can change it back to true
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  }

  this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});

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

  let form = (
    <form onSubmit={this.orderHandler}>
      {formElementsArray.map(formElement=>(
        <Input
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          changed={(event)=>this.inputChangedHandler(event,formElement.id)}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          key={formElement.id}></Input>
      ))}
      <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>

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
