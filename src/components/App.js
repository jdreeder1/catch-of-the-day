import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
//app component is our main compaint that will contain other components

//tagline inside the header component below is a prop - you can't use keywords reserved for html 
//attributes for props, but other than that, there's no limit to what you can name props
//for props: if you want to pass any other data type besides string, you encase the data in {}
class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    //componentDidMount is a life cycle method that is like a hook into the very sec our app is loaded on the pg (similar to document.ready in jQuery)
    //life cycle method: tell us when certain things are happening   
    componentDidMount(){
        //syncState allows you to set up two way data binding between your component's state and your Firebase. 
        //Whenever your Firebase changes, your component's state will change. Whenever your component's state changes, Firebase will change.
        const { params } = this.props.match;
        //in dev tools in App's props, select storeId nested in params (forward slash fishes refers to fishes object once bound w firebase)
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });  
    }
    //need to listen for unmounting to prevent memory leaks (leak could happen if we didn't clean up prior store when user hits back arrow 
    //to leave app and pick another store)
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    //the methods that update state need to live in the same component as state
    addFish = (fish) => { //method lives in App, but we want to run it from AddFishForm - use props to do this
        console.log('adding a fish');
        //to update state in React, need to use existing setState API
        //1. take a copy of the existing state, 
        const fishes = {...this.state.fishes}; //object spread will copy the object passed in
        //2. then add new fish to that fishes var, 
        fishes[`fish${Date.now()}`] = fish; //Date.now() measures ms since 1/1/70 - will give each obj a unique identifier
        //3. finally, set the new fishes object to state, so that we don't mutate the original object
        this.setState({
            fishes: fishes
        });
        //this function will take our copied old fishes plus our new fish and overwrite the existing state, which will trigger a change in React
        //and update the changed fish everywhere on our page
    };

    loadSampleFishes = () => {
        //alert('Loading sample!');
        this.setState({
            fishes: sampleFishes
        })
    }
    //to run in console, select App component in dev tools, and type $r.addToOrder('fish1') and hit enter
    addToOrder = (key) => {
        //1. take a copy of state
        const order = {...this.state.order};
        //2. either add to order or update # in order (i.e., if order exists, increment, else if none in order prev, change # to 1)
        order[key] = order[key]+1 || 1; 
        //3. call setState to update state obj - could simply write this.setState({ order }) bc value is same as key
        this.setState({
            order: order
        })
        
    }
    //Object.keys below gives us all the fishes keys in our state
    //.map() runs a function on each key
    //if don't give a unique identifier to each item rendered, React is much slower (takes longer to identify piece you want to update if don't...
    //differentiate each piece). Give it a unique identifier using React keyword called 'key'
    //'details' keyword below is user-created prop (not a reserved React keyword)
    //to pass key to addToOrder, have to pass it again w a prop that is something other than 'key', e.g., 'index'
    //can use spread operator to copy everything from state into Order component, e.g., <Order {...this.state} />

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSampleFishes ={this.loadSampleFishes} />
            </div>
        );
    }
}

export default App;