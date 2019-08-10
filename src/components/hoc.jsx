import React, { Component } from 'react';
import Dog from '../components/hoc/Dog'
 class Hoc extends Component {
     constructor(props){
         super(props);
     }

     render(){
         return (
             <div>
                 <Dog />
             </div>
         )
     }
 }

 export default Hoc;