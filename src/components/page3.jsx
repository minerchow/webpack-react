import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'
class Page3 extends Component {
    render() {
       return  (
            <div>
                page3
                <Link to="/">index</Link>
                <Link to="/page2">page3</Link>
            </div>
        )
    }
}

export default Page3;