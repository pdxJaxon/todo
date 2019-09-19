import React,{Component} from 'react';

export class TodoCreator extends Component{
	
	constructor(props){
		super(props);
		this.state = {newItemText:""};
	}

	updateNewTextValue = (event) => {
		this.setState({newItemText:event.target.value});
	}

	createNewTodo = () => {
		this.props.callback(this.state.newItemText);
		this.setState({newItemText:""});
	}

	render = () => 
		<div>
			<input className="form-control" 
				value={this.state.newItemText}
				onChange={this.updateNewTextValue}></input>
			<button className="btn btn-primary mt-1"
				onClick={this.createNewTodo}>Add Todo Item</button>
		</div>

}