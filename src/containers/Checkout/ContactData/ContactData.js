import React, {Component} from 'react';
import Button from '../../../src/components/UI/Button/Button';


class ContactData extends Component {
  state={
    name:'',
    email:'',
    address:{
      street:'',
      postalCode:''
    },

  }
  render(){
    return(
      <div>
        <h4>

        </h4>
        <form>
          <input type="text" name="name" placeholder="Your Name"></input>
          <input type="email" name="email" placeholder="Your Email"></input>
          <input type="text" name="street" placeholder="Street"></input>
          <input type="text" name="postal" placeholder="Postal Code"></input>
          <Button btnType="Success">Order</Button>

        </form>
      </div>
    );
  }
}

export default ContactData;
