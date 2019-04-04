import React,{ Component } from 'react';
import {
    Link,
    NavLink,
    Switch,
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
                <h1>tab切换页面</h1>
                <div className="link-box">
                    <NavLink  to="/routerhome/parent" >parent页面</NavLink>
                    <NavLink  to="/routerhome/child" >child页面</NavLink>
                </div>
                <Switch>
                    <Route exact path="/routerhome" Redirect="/parent" />
                    <Route path="/routerhome/parent" component={parent}/>
                    <Route path="/routerhome/child" component={child}/>
                </Switch>

            </div>
        );
    }
}
