import React, {Component} from 'react';


class PropsAndState extends Component {

    render() {
        return(
            <div>
                    <Alpha />
            </div>
        )
    }
}

export default PropsAndState;

class Alpha extends Component {
    state = {
        //alphaValue: this.state.alphaValue,
        counter: 1
    }
   
    // this.state.counter  = this.state.counter + 1;

    clickButton = () => {
        console.log("click");
        console.log(this.state.counter);

        let copyCounter = this.state.counter;
        copyCounter += 1;
        this.setState({
            counter: copyCounter
        })
    }

    render() {
        return(
            <div>
                    <button onClick = {this.clickButton}> Please click !! </button> 
                    {/* <Beta fromAlpha = { this.state.alphaValue} /> */}
            </div>
        )
    }
    
}

class Beta extends Component {
    state = {
        alphaValue: this.state.fromAlpha,
        counter: 1
    }
    // this.state.counter  = this.state.counter + 1;

    fromAlpha = () => {
        

        let copyCounter = this.state.counter;
        copyCounter += 1;
        this.setState({
            counter: copyCounter
        })
        console.log("click afafffff");
        console.log(this.state.counter);
        
    }

    render() {
        return(
            <div>
                    <button onClick = {this.fromAlpha} > Hi every one !!! </button>
            </div>
        )
    }
    
}
//export default Beta;