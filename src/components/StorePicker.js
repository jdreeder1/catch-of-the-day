import React from 'react'; //always need to import react into components
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

//every component we have will be its own class
class StorePicker extends React.Component { //every class in React needs to have render inside of it - determines what DOM elements render out to the page
    //constructor method will run before StorePicker component is created
    constructor(){
        super();
        this.goToStore = this.goToStore.bind(this); //will overwrite the method so that we can use 'this' within goToStore w/o error, i.e., 
        //it will bind goToStore to the StorePicker instance
        //instead of creating a constructor, can instead create an arrow function that is a property of StorePicker, e.g.,
       /* goToStore = (even) => {
            event.preventDefault;
            console.log(event);
        } */
    }
    
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    };

    goToStore(event) {
        event.preventDefault();
        //Golden rule in React: DON'T TOUCH THE DOM!!
        //instead, use a ref to reference the DOM node on the page
        //current is a React thing to get the input, the 2nd value is JS to get the value in the input
        const storeName = this.myInput.current.value;
        //push state allows us to change the url w/o refreshing the pg - do that w/ React router
        this.props.history.push(`/store/${storeName}`); //can find the push option by looking at devtools => components => StorePicker => history => push
        //State: an object that lives inside a component that stores all of the data that that component and its children need
        //state is a single source of truth. As long as store data as a variable, React will know where on the page it needs to udpate, e.g.,
        //if have a fish in state that cost 17.00, if you change the price of that fish in state, React will update the price everywhere 
        //that var is store on the page. I.e., can update state and React will 'react' to the change and update everywhere it needs to auto
    }
    render(){
        //JS has ASI: automatic semicolon insertion. If include JSX on new line instead of right after return, it will throw an error
        //unless you encapsulate the JSX with parentheses (thinks PEDMAS)
        //using JSX, when you want to use an html class, use className instead of class
        //with JSX, you cannot return sibling elements, e.g., putting a <p> outside the <form> below within the parentheses will throw an error
        //if want to return sibling elements, wrap them in a <React.Fragment> tag (Fragment is a method within react)
        //to comment in JSX, use curly braces to indicate using JS, then write block (not single-line) comment within braces 
        //how you would in JS
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                { /*
                    <button onClick{this.handleClick}>Click Me!</button> //if use () after handleClick, the function would run on page load
                */ }
                <h2>Please Enter a Store</h2>
                <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={ getFunName() }/>
                <button type="submit">Visit Store</button>
            </form> 
        )
    }
}

export default StorePicker;