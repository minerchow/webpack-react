import React, { Component } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
@observer
class Bodys extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
        return <div>
            <div>我是中间</div>
            <div>{this.props.countstore.displayResult}</div>
            <button onClick={() => this.props.countstore.add()}>mobx +1</button>
        </div>
    }
}

export default Bodys;