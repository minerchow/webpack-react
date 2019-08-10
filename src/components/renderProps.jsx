import React, { Component } from 'react';
import Mouse from '../components/renderProps/Mouse';
import Cat from '../components/renderProps/Cat'
 class RenderProps extends Component {
     constructor(props){
         super(props);
     }

     render(){
         return (
             <div>
                 <Mouse render={(mouse)=><Cat mouse={mouse}/> }/>
             </div>
         )
     }
 }

 export default RenderProps;