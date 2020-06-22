import React, {Component} from 'react';

const API ='';
    
class Api extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        data: null
      };
    }
   
    componentDidMount() {
        console.log(API);
        
      fetch(API)
    
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }
   

    render() {
        return(
            <div className = "rmdb-api"> 
              
                </div> 
                )
    }
     
  }
   
  export default Api;