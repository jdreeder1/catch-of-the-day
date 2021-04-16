import React from 'react';
import PropTypes from 'prop-types';
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

//prop types allow us to specify ahead of time what needs to be passed in when it's used. If someone doesn't pass in the right type of data,
//it'll show a warning in their console that they failed their prop type
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
//if value passed to Header component prop called tagline in App.js isn't a string or is empty, the console will throw an error 
//(propTpes errors only show in dev not prod env)
Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;