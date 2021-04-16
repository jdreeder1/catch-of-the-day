import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
//base was default export, use {} for named export
import base, { firebaseApp } from '../base';

//addFish passed in via props from App component
//turn fishes object into array, then add EditFishForm to each fish in array
class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };
    //when component mounts (i.e., when page loaded and component rendered), firebase will see if a user is logged in/authenticated, 
    //if so (true), it will pass us the logged in user that we pass as an arg to our authHandler func
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({user});
            }
        })
    }

    authHandler = async(authData) => {
        console.log(authData);
        //1. Lookup current store in firebase database
        //if want the store and not a promise saved as store var, use await keyword
        //using context: this gives info on how to best fetch the obj
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);
        //2. Claim it if there's no owner (i.e., claim store if first login to store)
        if(!store.owner) //save it as our owm
        await base.post(`${this.props.storeId}/owner`, {
            data: authData.user.uid
        }); //post userid to owner field
        //3. Set the state of the inventory component to reflect the current user
        //sometimes when you don't need data outside any other component, can create state that is just local to that component
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }
    authenticate = (provider) => {
        //alert(provider);
        //create authProvider depending on what they want to signin with
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler); //once someone signs in, call authHandler func
    }

    logout = async () => {
        console.log('Logging out!');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>
        //1. check if user is logged in, if not, show login page
        if(!this.state.uid){
            return <Login authenticate={this.authenticate} />
        }
        //check if the user is not the owner of the store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry, you are not the owner!</p>
                    {logout}
                </div>
            )
        }
        else {
        return (
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                <EditFishForm 
                    key={key}
                    index={key} 
                    fish={this.props.fishes[key]} 
                    updateFish={this.props.updateFish} 
                    deleteFish={this.props.deleteFish}
                /> )}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
            )
        }
    }
}

export default Inventory;