import React from 'react'
import ShopContext from '../context/shop-context';
import Product from './Product'
class Cart extends React.Component{
    static contextType = ShopContext;
    render(){
        alert(this.context.cart.length)
        return (
            <React.Fragment>
                {this.context.cart.map(item=><Product key={item._id} image={item.image} />)}
            </React.Fragment>
            )
    }
}

export default Cart;