import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    //separate render function b/c don't need to make separate component but other render function was getting complex
    renderOrder = (key) => {
        const fish = this.props.fishes[key]; //grabs the fish looping over
        const count = this.props.order[key]; //grabs the number of the chosen fish in order
        const isAvailable = fish && fish.status === 'available';
        //make sure fish is loaded before we continue (e.g., wait for rebase to pull fish before setState using fish)
        if(!fish) return null;
        //if statement below makes sure unavailable fish aren't added to our order
        if(!isAvailable){
            return (<li key={fish.name}>
                Sorry {fish ? fish.name : 'fish'} is no longer available 
            </li>)
        }
        return (<li key={fish.name}>
            {count} lbs {fish.name} &nbsp;
            { formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </li>)
    }
    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key]; //grabs the fish looping over
            const count = this.props.order[key]; //grabs the number of the chosen fish in order
            const isAvailable = fish && fish.status === 'available'; //boolean for if the fish is available
            if(isAvailable){ //prevTotal is running tally of order cost so far
                return prevTotal + (count * fish.price);
            }
            return prevTotal; //if fish not available, skip it and carry prevTotal over for next fish
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul>
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total: <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;