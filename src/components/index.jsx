import React, { Component } from 'react';
import { render } from 'react-dom';
import Bottom from './index/bottom';
import Bodys from './index/bodys';
import Top from './index/top';
import CountStore from '../store/countStore';
const CountStores  = new CountStore();
var arr=[1,2,3,4];
var arrs=[{
    a:"d"
},
{
    a:"b"
}]
class Index extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return <div id="index">
        <div>123132</div>
            <Top id="top" kkk={arr}  dataid={arrs}></Top>
            <Bodys id="bodys" countstore={CountStores}>744855</Bodys>
            <Bottom id="bottom">213213</Bottom>
        </div>
    }

}



export default Index;