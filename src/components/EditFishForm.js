import React from 'react';
import PropTypes from 'prop-types';

//React won't let us update state using an editable form w/o using onChange event
class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string, 
            name: PropTypes.string, 
            price: PropTypes.number, 
            desc: PropTypes.string, 
            status: PropTypes.string
        }),
        index: PropTypes.string,
        updatedFish: PropTypes.func
    };

    handleChange = (event) => {
        //update that fish 
        //take a copy of the current fish
        //use object computed key-values from ES6 to get value of input field
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }
    render(){
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/>
                <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price}/>
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}></textarea>
                <input type="text" onChange={this.handleChange} name="image" value={this.props.fish.image}/>
                <button onClick={() => {this.props.deleteFish(this.props.index)}}>Remove Fish</button>
            </div>
        );
    }
}

export default EditFishForm;