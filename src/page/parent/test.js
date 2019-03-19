import React,{ Component } from 'react';

class Child extends Component {
    constructor(props){
        super(props)
    }
    childMethod(){
        return '子组件方法被调用'
    }
    parentMethod(){
        this.props.parentMethod()
    }
    render() {
        return (
            <div className="home">
                <p>我是子组件</p>
                <button onClick={this.parentMethod.bind(this)}>调用父组件方法</button>
            </div>
        );
    }
}

export default class Parent extends Component {
    constructor(props){
        super(props);
        this.state={
            aa:''
        }
    }

    setChild(){
        let res=this.refs.child.childMethod();
        this.setState({aa:res})
    }
    parentMethod(){
        alert("父组件方法被调用")
    }
    render() {
        return (
            <div className="home">
                <p>我是父组件</p>
                <p>子组件传递的数据：{this.state.aa}</p>
                <button onClick={this.setChild.bind(this)}>调用子组件方法</button>
                <hr/>
                <Child ref="child" parentMethod={this.parentMethod.bind(this)} />
            </div>
        );
    }
}
