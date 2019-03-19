import React from 'react'
import {connect} from 'react-redux'
import {setUserInfo} from '../../redux/action'
import {withRouter} from "react-router-dom";
import './index.scss'
class HeaderComponent extends React.Component{
    constructor(props){
        super(props)
    }
    loginOut(){
        this.props.setUserInfo('');
        setTimeout(()=>{
            this.props.history.push('/login');
        })

    }
    render(){
        return(
            <div className="header-box" style={{color:'#fff'}}>
                <p>admin管理中心</p>
                <div>欢迎：{this.props.user.NickName} <button onClick={this.loginOut.bind(this)}>退出登录</button></div>
            </div>
        )
    }
}

const mapState=(store)=>{
   return {user:store.user.userInfo}
}
export default connect(mapState,{setUserInfo})(withRouter(HeaderComponent))
