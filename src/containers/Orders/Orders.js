import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
  state={
    orders:[],
    laoding:true
  }


  componentDidMount(){
    axios.get('/orders.json')
    .then(res=>{
      // res.data->{Lt6sYAjscVrgsgmG4bX: {…}}
      const fetchedOrders = [];
      for (let key in res.data){
        //key->Lt6sYAjscVrgsgmG4bX
        fetchedOrders.push({...res.data[key],
        id:key});
      }
      //fetchedOrders->[{ingredients:{},id:},{...}]
      this.setState({loading:false,orders:fetchedOrders});
    })
    .catch(err=>{
      this.setState({loading:false})
    })
  }

  render(){

    return(
      <div>
        {this.state.orders.map(order=>(<Order ingredients={order.ingredients} price={order.price} key={order.id}/>))}
      </div>
    );
  }
}


export default withErrorHandler(Orders,axios);
