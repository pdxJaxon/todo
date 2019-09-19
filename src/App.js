import React, {Component} from 'react';
import {TodoBanner} from "./TodoBanner";
import {TodoRow} from "./TodoRow";
import {TodoCreator} from "./TodoCreator";
import {VisibilityControl} from "./VisibilityControl";



export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      userName:"Iggy",
      todoItems: [
        {action: "Buy Flowers", done: false},
        {action: "Get Shoes", done: false},
        {action: "Collect Tickets", done: true},
        {action: "Call Wookie", done: false}
      ],
      showCompleted: true
    }
  }

  todoTableRows = (completedValue) => this.state.todoItems.filter(item => item.done === completedValue).map(item => 
    <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>)


  toggleTodo = (todo) => this.setState({todoItems:
    this.state.todoItems.map(item => item.action === todo.action 
      ? {...item,done:!item.done}:item) });



  updateNewTextValue = (event) => {
    this.setState({newItemText: event.target.value});
  }

  createNewTodo = (taskIn) => {

    if(!this.state.todoItems
        .find(item => item.action === taskIn)){
          this.setState({
          todoItems:[...this.state.todoItems,
          {action:taskIn, done:false}]
        },() => localStorage.setItem("todos",JSON.stringify(this.state)));
      }
    
  }

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data):
    {
      userName:"Iggy",
      todoItems: [
        {action: "Buy Flowers", done: false},
        {action: "Get Shoes", done: false},
        {action: "Collect Tickets", done: true},
        {action: "Call Wookie", done: false}
      ],
      showCompleted: true
    });

    
  }


  changeStateData = () => {
    this.setState(
        {
          userName: this.state.userName === "Iggy" ? "LuLu" : "Iggy"
        }
      )
  }

  render = () => 
    
        <div>
          <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
          <div className="container-fluid">
            <TodoCreator callback={this.createNewTodo} />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Complete</th>
                </tr>
              </thead>
              <tbody>
                {this.todoTableRows(false)}
              </tbody>
            </table>
            <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed tasks"
              isChecked={this.state.showCompleted}
              callback={(checked) =>
                this.setState({showCompleted:checked})
              } />
          </div>
          {
            this.state.showCompleted &&
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Is Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.todoTableRows(true)}
                </tbody>
              </table>
          }
        </div>
      </div>
  }

