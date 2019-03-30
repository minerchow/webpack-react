import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter , Switch , Route  } from 'react-router-dom'
import Index from '../src/components/index';

import './app.css';
import {CSSTransitionGroup} from 'react-transition-group' ;
import Loadable from 'react-loadable';
function Loading() {
    return <div>Loading...</div>;
  }
const Page2Component = Loadable({
    loader: () => import('../src/components/page2'),
    loading: Loading,
});

const Page3Component = Loadable({
    loader: () => import('../src/components/page3'),
    loading: Loading,
});

render(
    <BrowserRouter>
         <Route render={({location}) => ( 
             <CSSTransitionGroup
             transitionName="a"
             transitionEnterTimeout={500}
             transitionLeaveTimeout={300}>
             
             <Switch key={location.pathname} >
             <Route exact path='/' component={Index}/>
             {/* both /roster and /roster/:number begin with /roster */}
             <Route exact path='/page2' component={Page2Component}/>
             <Route exact path='/page3' component={Page3Component}/>
            </Switch>
        
            </CSSTransitionGroup>
         )}/>
        
    </BrowserRouter>
  , document.getElementById('app'));


