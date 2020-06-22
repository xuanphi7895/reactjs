import React, { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoad: false
        }
    }
    componentDidMount() {
        // debugger
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => {
            console.log(err);
        });

    }
    render() {
        var {isLoad, items} = this.state;
   
            return (
            <div  >
                
                {items.map(item => (
                   <li> {item.state_code} </li>
                ))};
            </div>
        )
    }
}

export default Spinner;