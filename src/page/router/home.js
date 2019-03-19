import React,{ Component } from 'react';
import {
    Link,
    NavLink,
    Route,
    Redirect

} from 'react-router-dom'
import './home.scss'
import parent from './home/index'
import child from './child/index'

export default class Home extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="home">
                <div className="link-box">
                    <NavLink  to="/routerhome/parent" >parent页面</NavLink>
                    <NavLink  to="/routerhome/child" >child页面</NavLink>
                </div>


                <Route path="/routerhome/parent" component={parent}/>
                <Route path="/routerhome/child" component={child}/>
            </div>
        );
    }
}
