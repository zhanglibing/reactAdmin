import React, {Component} from 'react';
import {Button, Table, Card, Pagination,Select,Tag} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import api from '../../api'
import './list.scss'
export default class CapitalFlows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList:[],
            userList: [1],
            Total: 0,
            columns: [
                {
                    label: "真实姓名",
                    prop: "RealName",
                    width: 120,
                },
                {
                    label: "变动的金额",
                    prop: "money",
                    width: 120,
                    render: (data)=>{
                        let tag= data.money>0?<Tag type="success">{data.money}</Tag>:<Tag type="danger">{data.money}</Tag>
                        return tag;
                    }
                },
                {
                    label: "说明备注",
                    prop: "Description",
                },
                {
                    label: "变动之前的余额",
                    prop: "BeforeBalance",
                    width: 140
                },
                {
                    label: "变动之后的余额",
                    prop: "Balance",
                    width: 140
                }, {
                    label: "下单类别",
                    prop: "OrderType",
                    width: 120,
                    render: (data)=>{
                             let tag= data.OrderType==0?<Tag type="success">正常下单流程</Tag>:<Tag type="danger">客服代下单</Tag>
                             return tag;
                        }
                }, {
                    label: "资金的类型",
                    prop: "CapitalType",
                    width: 120,
                    render:(data)=>{
                        return this.getTypeDesc(data.CapitalType)
                    }
                },
                {
                    label: "时间",
                    prop: "CreateDate",
                    width: 170
                }
            ],
            pageSize: 20,
            Page: 1,
            customerId: '',
            startDate: '',
            endDate: '',
            OrderType: -1,
            FromSouceOption: [{val:-1,label:'所有'},{val:0,label:'正常下单流程'},{val:1,label:'客服代下单'},],
        }
    }

    componentWillMount() {
        this.getList();
        this.getUser()
    }
    //跳转页面
    goPage(index) {
        this.setState({
            Page: index
        })
        setTimeout(()=>{
            this.getList()
        })
    }
    onSizeChange(size){
        this.setState({
            pageSize: size
        })
        setTimeout(()=>{
            this.getList()
        })
    }
    //获取列表
    async getList() {
        let {pageSize, Page,customerId,startDate,endDate,OrderType} = this.state;
        let {Data, Total}=await api.money.getCapitalFlows({pageSize, Page,customerId,startDate,endDate,OrderType});
        this.setState({
            userList: Data,
            Total
        })
    }
    //获取用户列表
    async getUser(){
        let res1 =await api.user.getCustomersList();
        let res =await api.user.getConsultanterList();
        this.setState({
            nameList: [...res1,...res],
        })
    }

    customerChange(name,val){
        this.setState({  //setState 为一异步函数
            [name]:val
        },()=>{
            this.getList()
        })
    }
    //过滤资金类型
    getTypeDesc(val){
        let obj={0:'充值',1:'提现',2:'退款',3:' 佣金',4:'付款',5:'收益'}
        let typeTag={0:'',1:'info',2:'danger',3:'success',4:'warning',5:'info'}
        return <Tag type={typeTag[val]}>{obj[val]}</Tag>;
    }
    render() {
        return (
            <div>
                <PageTitle title="资金流信息"/>
                <Card className="box-card">

                    <label htmlFor="">
                        <b>选择用户</b>
                        <Select  value={this.state.customerId} filterable={true}  clearable={true} onChange={this.customerChange.bind(this,'customerId')}>
                            {
                                this.state.nameList.map(el => {
                                    return <Select.Option key={el.Id} value={el.Id} label={`${el.Username}  ${el.RealName?el.RealName:''}`}/>
                                })
                            }
                        </Select>
                    </label>
                    <label htmlFor="">
                        <b>下单类别</b>
                        <Select  value={this.state.OrderType}  onChange={this.customerChange.bind(this,'OrderType')}>
                            {
                                this.state.FromSouceOption.map(el => {
                                    return <Select.Option key={el.val} value={el.val} label={el.label}/>
                                })
                            }
                        </Select>
                    </label>

                    <Button type="primary" icon="search" onClick={this.getList.bind(this)}>搜索</Button>
                </Card>
                <Card className="box-card">
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.userList}
                        border={true}
                    />
                    <div className="pagin">
                        <Pagination layout="total, sizes, prev, pager, next, jumper"
                                    total={this.state.Total}
                                    pageSizes={[20, 30, 40,50]}
                                    pageSize={this.state.pageSize}
                                    currentPage={this.state.Page}
                                    onCurrentChange={this.goPage.bind(this)}
                                    onSizeChange={this.onSizeChange.bind(this)}
                        />
                    </div>

                </Card>
            </div>
        );
    }
}

