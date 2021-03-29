//everything in React is a component: a re-usable piece of your website. React allows you to create your own 'tags' and supply those tags w your own info
//First thing need to do: import dependencies
import React from 'react'; //import react dependency using ES6 modules 
import { render } from 'react-dom'; //only need render method from react-dom package
/*
import StorePicker from './components/StorePicker';
import App from './components/App';
*/ //don't need StorePicker and App imported anymore, will be included indirectly through Router component
import Router from './components/Router';
import './css/style.css'; //can import css into each relevant component file of include a link href into the relevant html file

//render method takes JSX (similar to html) and mounting point (DOM element attach React code to)
//best practice is to store components in a separate file - makes them easy to import and use them whenever we want
render(<Router/>, document.getElementById('main'));

//Props: props are to React what attributes are to elements in html
//State: where the data lives. Props are like the car, state is like the home

//in devtools, if you select a React component and type $r in the console and hit enter, it will show you the selected React component in the console

//if your component only has a render method, then it's better to convert it to a stateless functional component