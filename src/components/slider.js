import React from 'react';
import {Link, NavLink}    from 'react-router-dom';
import {Layout,Menu} from 'element-react';
import '../font/iconfont.css'



export default class Slide extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active:'/'
        }
    }
    menuSelect(index){
        this.setState({
            active:index
        })
    }
    componentWillMount(){
      // console.log(this.props.history.location)
    }
    render() {
        return (
            <div style={{width: 200, paddingTop: 64}}>
                <Layout.Col>
                    <Menu defaultActive={this.state.active} className="el-menu-vertical-demo"  theme="dark" onSelect={this.menuSelect.bind(this)}>
                        <NavLink exact to="/"><Menu.Item index="/"><i className="iconfont icon-home"></i>首页</Menu.Item></NavLink>
                        <Menu.SubMenu index="2" title={<span><i className="iconfont icon-shangpin"></i>商品目录</span>}>
                            <NavLink to="/GoodManage"><Menu.Item index="/GoodManage">商品管理</Menu.Item></NavLink>
                            <NavLink to="/GoodClass"><Menu.Item index="/GoodClass">商品分类</Menu.Item></NavLink>
                            <NavLink to="/GoodAttribute"><Menu.Item index="/GoodAttribute">属性管理</Menu.Item></NavLink>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="3" title={<span><i className="iconfont icon-kehu"></i>客户</span>}>
                            <NavLink to="/CustomerList"><Menu.Item index="/CustomerList">客户管理</Menu.Item></NavLink>
                            <NavLink to="/CustomerRole"><Menu.Item index="/CustomerRole">客户角色</Menu.Item></NavLink>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="4" title={<span><i className="iconfont icon-zijinguanli"></i>资金管理</span>}>
                            <NavLink to="/withdrawal"><Menu.Item index="/withdrawal">提现申请</Menu.Item></NavLink>
                            <NavLink to="/MoneyStatistical"><Menu.Item index="/MoneyStatistical">资金统计</Menu.Item></NavLink>
                            <NavLink to="/list"><Menu.Item index="/list">资金流信息</Menu.Item></NavLink>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Col>
            </div>
        );
    }
}
