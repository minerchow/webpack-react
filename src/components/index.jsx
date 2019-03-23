import React, { Component } from 'react';
import { render } from 'react-dom';
import Bottom from './index/bottom';
import Bodys from './index/bodys';
import Top from './index/top';
import CountStore from '../store/countStore';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom'
const CountStores  = new CountStore();
var arr=[1,2,3,4];
var arrs=[{
    a:"d"
},
{
    a:"b"
}]
let district = [{
    value:'a',
    label:'a'
},
{
    value:'b',
    label:'b'
}
]
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            pickarr:[]
        }
        //this.okChange = this.okChange.bind(this,v)
    }
    okChange(v){
        this.setState({
            pickarr:v
        })
    }
    render(){
        let pickarr = this.state.pickarr
        return <div id="index">
       
        <Link to={{ pathname:'/page2',query:{goodsId: 1},search:'?goodsId=2'}}>page2</Link>
        <Link to="/page3">page3</Link>
        <div>123132</div>
            <Top id="top" kkk={arr}  dataid={arrs}></Top>
            <Bodys id="bodys" countstore={CountStores}>744855</Bodys>
            <Bottom id="bottom">213213</Bottom>
            <Picker data={district} cols={1} value={pickarr} className="forss" onOk={v=>this.okChange(v)}>
                <List.Item arrow="horizontal">Single</List.Item>
            </Picker>
        </div>
    }

}



export default Index;