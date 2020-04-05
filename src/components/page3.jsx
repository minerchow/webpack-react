import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Util from '../common/util';
import WinSizeApp from './hooks/winSizeApp'
class Page3 extends Component {
    constructor(props){
        super(props);
        Util.say();
    }
    render() {
       return  (
            <div>
                page3
                <Link to="/">index</Link>
                <Link to="/page2">page3</Link>
                <WinSizeApp />
            </div>
        )
    }
}

export default Page3;