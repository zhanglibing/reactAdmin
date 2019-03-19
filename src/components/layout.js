import React from 'react'
import 'antd/dist/antd.css';
import Slider from './slider'
import HeaderComponent from './header/index'
import './layout.scss'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class LayoutWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state={
            time:''
        }
    }
    componentWillMount(){
        this.setState({
            time:this.getTime()
        })
    }
    getTime(){
        var myDate = new Date();
        var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        var day=myDate.getDate();        //获取当前日(1-31)
        var seven=myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        var h=myDate.getHours();
        var s=myDate.getMinutes();
        var m=myDate.getSeconds();
        month=(month<10)?("0"+month):month;
        day=(day<10)?("0"+day):day;
        h=(h<10)?("0"+h):h;
        s=(s<10)?("0"+s):s;
        m=(m<10)?("0"+m):m;
        return year+'年'+month+'月'+day+'日 '+h+":"+s;
    }
    render(){
        return (
        <Layout>
            <Sider><Slider/></Sider>
            <Layout>
                <Header><HeaderComponent/></Header>
                <Content style={{minHeight:'calc(100vh - 110px)',padding:'10px'}}>
                    {this.props.children}
                </Content>
                <Footer>
                    <span className="left">Powered by ALDING</span>
                    <span>{this.state.time}</span>
                    <span className="right">ALDING version 2.0</span>
                </Footer>
            </Layout>
        </Layout>
        )
    }
}