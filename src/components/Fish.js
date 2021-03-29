import React from 'react';
import {formatPrice} from '../helpers'; //import function using {}

class Fish extends React.Component{
    handleClick = () => {
        this.props.addToOrder(this.props.index)
    }
    //ES6 destructuring: use {} to refer to keys in an object with the same name as the variable's name
    render(){
        const {image, name, price, desc, status} = this.props.details;
        //const name  = this.props.details.name; 
        const isAvailable = status === 'available'; //sets isAvailable to a boolean, if false, add to cart button is disabled
        return(
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fish-name">{name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to Order' : 'Sold Out'}</button>
            </li>
        );
    }
}

export default Fish; 