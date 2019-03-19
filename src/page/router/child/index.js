import React,{ Component } from 'react';
export default class Child extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="home">
                <button onClick={this.props.history.goBack}>返回</button>
                子级路由
            </div>
        );
    }
}
