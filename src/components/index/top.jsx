import React, { Component } from 'react';
import { render } from 'react-dom';
import './top.less';
import Bottom from './bottom';
class Top extends Component {
    constructor(props){
        super(props);
        this.state={
            commit:1,
            egg:18
        }
        this.add=this.add.bind(this);
        console.log(props)
    }
    add(event){
        var b=this.state.commit;
        b++;
        this.setState({
            commit:b
        })
    }
    render(){
        return <div className="top-wrap" style={div}>
        <div className="text">1231231</div>
           <select >
               <option value="男">男</option>
               <option value="女">女</option>
               <option value="程序员">程序员</option>
               <option value="前端程序员">前端程序员</option>
               
           </select>
           <p>{this.state.commit}</p>
           <p>{this.props.kkk}</p>
           <p>{
             this.props.dataid.map(function(val){
                 return  <p>{val.a}</p>  
             })
           }</p>
          
           <button type='button' onClick={this.add}>+</button>
        </div>
    }
}
var div={
    height:"300px"

}

export default Top;