import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
function getParameterByName(name,queryString){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    if (!queryString) {
        queryString = location.search;
    }
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(queryString);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
class Page2 extends Component {
    constructor(props){
        super(props)
        console.log( this.props)
        console.log(getParameterByName('goodsId',this.props.location.search))
    }

    componentDidMount(){
        
    }
    render() {
     return (
            <div>page2

        <Link to="/">index</Link>
        <Link to="/page3">page3</Link>
            </div>
        )
    }
}

export default Page2;