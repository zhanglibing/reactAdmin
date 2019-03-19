import React, {Component} from 'react';
import {connect} from "react-redux"
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,

} from 'react-router-dom'


import PrivateRouter from './privateRouter'
import LayoutWrapper from './components/layout'
import Home from './page/home'
import CustomerList from './page/customer/index'
import CustomerRole from './page/customerRole/index'
import CapitalFlows from './page/capitalFlows/List'
import MoneyStatistical from './page/moneyStatistical/index'
import Withdrawal from './page/withdrawal/index'
// import GoodManage from './page/goodManage/index'
import GoodClass from './page/goodClass/index'
import GoodAttribute from './page/goodAttribute/index'
import Login from './page/login/index'

import routerHome from './page/router/home'
import parent from './page/parent/test'


export default class App extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
    }
    render() {
        let LayoutRouter = (
            <LayoutWrapper>
                <Switch>
                    <PrivateRouter exact path="/" component={Home}/>
                    <PrivateRouter path="/list" component={CapitalFlows}/>
                    <PrivateRouter path="/withdrawal" component={Withdrawal}/>
                    <PrivateRouter path="/MoneyStatistical" component={MoneyStatistical}/>
                    <PrivateRouter path="/CustomerList" component={CustomerList}/>
                    <PrivateRouter path="/CustomerRole" component={CustomerRole}/>
                    {/*<Route path="/GoodManage" component={GoodManage}/>*/}
                    <Route path="/GoodClass" component={GoodClass}/>
                    <Route path="/GoodAttribute" component={GoodAttribute}/>
                    <Route path="/parent" component={parent}/>
                    <Route path="/routerhome"  component={routerHome}>
                        <Redirect  path="/routerhome/parent" />
                    </Route>
                    {/*<routerHome>*/}
                        {/*<Route path="/routerhome" exact component={routerHome}/>*/}
                        {/*<Route path="/routerhome/parent" component={parent}/>*/}
                        {/*<Route path="/routerhome/child" component={child}/>*/}
                    {/*</routerHome>*/}

                </Switch>
            </LayoutWrapper>
        );
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" render={props => LayoutRouter} />
            </Switch>
        );
    }
}
