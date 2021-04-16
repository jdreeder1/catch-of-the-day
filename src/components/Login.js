import React from 'react'; //always need to import react into components
import PropTypes from 'prop-types';
//stateless functional component - don't need to use 'this' when referring to props within stateless func, 
//just need to pass as arg to said func
 const Login = (props) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory.</p>
        <button className="github" onClick={()=> {props.authenticate('Github')}}>Log In With Github</button>
        <button className="facebook" onClick={()=> {props.authenticate('Facebook')}}>Log In With Facebook</button>
        <button className="twitter" onClick={()=> {props.authenticate('Twitter')}}>Log In With Twitter</button>
    </nav>
 );
//typically want to use isRequired when setting propTypes
Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;