import React,{ Component } from 'react';
import './home.scss'
export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            val:1
        }
    }
    clickAlert(){
        alert(12)
    }
    inputChange(e){
        this.setState({
            val:e.target.value
        })
    }
    render() {
        return (
            <div className="home">
                <p className="red" onClick={this.clickAlert.bind(this)}> home页面 点击事件</p>
                <input value={this.state.val} onChange={this.inputChange.bind(this)} type="text"/>
                <div className="content">内容 {this.state.val} </div>
            </div>
        );
    }
}
