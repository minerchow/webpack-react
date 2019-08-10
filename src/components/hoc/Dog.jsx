import React, { Component } from 'react';
import withMouse from './withMouse';

class Dog extends Component {
    constructor(props){
        super(props);
    
        
    }
  
    render(){
        return (
            <div style={{height:80,width:80,backgroundColor:'#ff0000',position:"absolute",left:this.props.mouse.x?this.props.mouse.x:0,top:this.props.mouse.y ? this.props.mouse.y :0}} >
               
            </div>
        )
    }
}

export default withMouse(Dog);