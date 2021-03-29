import React from 'react';

//Header function below does the same thing as component below and it's called a 'stateless functional component.'
/*const Header = (props) => {
    return (
        <header className="top">
            <h1>Catch 
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span> 
            Day</h1>
            <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
        </header>
    )
}*/

//when you want to use a variable in JSX, use {} bc this tells react you're using JS
//in below example, 'this' is the component instance, props is an object within the component that contains all of our created properties
//and tagline is the name of the prop created in the Header component in the App.js file 
class Header extends React.Component {
    render(){
        return (
            <header className="top">
                <h1>Catch 
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span> 
                Day</h1>
                <h3 className="tagline">
                <span>{this.props.tagline}</span>
            </h3>
            </header>
        )
    }
}

export default Header;