import React, {Component} from 'react';
import {Button, Table, Card,MessageBox,Message} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import {connect} from "react-redux"
import {setUserInfo} from "../../redux/action"
import api from '../../api/login.js'
import './login.scss'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: ''
        }
    }
    componentWillMount() {

    }
    //获取商品分类
    login(){
        let {Username,Password}=this.state;
        api.login({
            Username,Password
        }).then(res=>{
            Message.success('登录成功');
            this.props.setUserInfo(res);
            setTimeout(()=>{
                this.props.history.push('/');
            })
        }).catch(data =>{
            Message.error(data);

        })
    }

    inputChange(name,e){
        this.setState({
            [name]:e.target.value
        })

    }
    render() {
        return (
            <div>
                <PageTitle title="登录"/>
                <Card className="loginBox">
                    <label htmlFor=""><input type="text" placeholder="请输入账号" onChange={this.inputChange.bind(this,'Username')}/></label>
                    <label htmlFor=""><input type="text" placeholder="请输入密码" onChange={this.inputChange.bind(this,'Password')}/></label>
                    <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                </Card>
            </div>
        );
    }
}

export default connect(null,{setUserInfo})(Login) ;