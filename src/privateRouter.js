import React, {Component} from 'react';
import {connect} from "react-redux"
import {Route, withRouter} from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.userId) {
            const {history} = this.props;
            setTimeout(() => {
                history.replace("/login");
            }, 1000)
        }
    }
    render() {
        let {component: Component, ...rest} = this.props;
        return this.props.userId ?
            (<Route {...rest} render={(props) => ( <Component {...props} />
            )}/> ) : (<p style={{"width": "100%", "text-align": "center", "fontSize": "20px", "lineHeight": "50px"}}>
                请登录...</p>)
    }
}
const getState = store => {
    let userId = store.user.userInfo.Id;
    return {userId};
}

export default connect(getState, null)(withRouter(PrivateRoute))
