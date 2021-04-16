import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import {TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func 
    };
    //separate render function b/c don't need to make separate component but other render function was getting complex
    renderOrder = (key) => {
        const fish = this.props.fishes[key]; //grabs the fish looping over
        const count = this.props.order[key]; //grabs the number of the chosen fish in order
        const isAvailable = fish && fish.status === 'available';
        //spread transitionOptions into CSSTransitions object instead of repeating <CSSTransition classNames="order" key={key} timeout={{enter: 500, exit: 500}}>
        const transitionOptions = {
            classNames: "order", 
            key: key, 
            timeout: {enter: 500, exit: 500}
        };
        //make sure fish is loaded before we continue (e.g., wait for rebase to pull fish before setState using fish)
        if(!fish) return null;
        //if statement below makes sure unavailable fish aren't added to our order
        if(!isAvailable){
            return (
            <CSSTransition {...transitionOptions}>
            <li key={fish.name}>
                Sorry {fish ? fish.name : 'fish'} is no longer available 
            </li>
            </CSSTransition>
            )
        }
        return (
            <CSSTransition {...transitionOptions}>
            <li key={key}>
                <span>
                    <TransitionGroup component="span" className="count">
                        <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
                            <span>{count}</span> 
                        </CSSTransition>
                    </TransitionGroup>
                    lbs {fish.name} &nbsp;
                    { formatPrice(count * fish.price)}
                    <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                </span>
            </li>
            </CSSTransition>
        )
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
        //component attribute tells TransitionGroup what element to render on pg
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;