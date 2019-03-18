import React, {Component} from 'react';
import {Button, Table, Card,Input,DatePicker} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import api from '../../api'
// import {getTime} from '../../common'
import './index.scss'
export default class MoneyStatistical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList:[],
            userList: [1],
            Total: 0,
            columns: [
                {
                    label: "充值金额",
                    prop: "TotalTopup",
                },
                {
                    label: "充值人数",
                    prop: "TopupHeadcount",
                },
                {
                    label: "充值笔数",
                    prop: "TopupTimes",
                },
                {
                    label: "下单金额",
                    prop: "OrderTotal",
                },
                {
                    label: "下单人数",
                    prop: "OrderHeadcount",
                }, {
                    label: "下单笔数",
                    prop: "paidHeadcount",
                },
                {
                    label: "支付成功人数",
                    prop: "paidHeadcount",
                },
                {
                    label: "支付成功笔数",
                    prop: "paidTiems",
                }
            ],
            columns1: [
                {
                    label: "待支付金额",
                    prop: "Unpaid",
                },
                {
                    label: "已支付金额",
                    prop: "paid",
                },
                {
                    label: "待确认金额",
                    prop: "paid",
                },
                {
                    label: "待咨询金额",
                    prop: "Counseling",
                },
                {
                    label: "待评价金额",
                    prop: "Consulted",
                }, {
                    label: "交易完成金额",
                    prop: "Complete",
                },
                {
                    label: "交易关闭金额",
                    prop: "Tradingclosed",
                },
                {
                    label: "",
                    prop: "",
                }
            ],
            columns2: [
                {
                    label: "咨询师提现金额",
                    prop: "ConsultantWithdrawals",
                },
                {
                    label: "用户提现金额",
                    prop: "CustomerWithdrawals",
                },
                {
                    label: "平台服务费",
                    prop: "PlatformEarningsWithDate",
                },
                {
                    label: "咨询师收益",
                    prop: "ConsultantTotalRevenueWithDate",
                },
                {
                    label: "退款金额",
                    prop: "RefundTotal",
                }
            ],
            startDate:'',
            endDate:''
        }
    }

    componentWillMount() {
        this.getList();
    }

    //获取列表
    getList() {
        let {startDate,endDate}=this.state;
        let option={startDate:startDate,endDate:endDate}
        api.money.getCapital(option).then(res => {
            this.setState({
                userList:res,
            })
        })
    }

    customerChange(name,val){
        this.setState({  //setState 为一异步函数
            [name]:val
        },()=>{
            this.getList()
        })
    }
    render() {
        return (
            <div>
                <PageTitle title="资金统计"/>
                <Card className="box-card topbox">
                    <label htmlFor="">
                        <b>用户账户余额</b>
                        <Input readOnly={true} value={this.state.userList[0].CustomerTotal}  append="元" />
                    </label>
                    <label htmlFor="">
                        <b>咨询师账户余额</b>
                        <Input readOnly={true}  value={this.state.userList[0].ConsultantTotal}   append="元"/>
                    </label>
                    <label htmlFor="">
                        <b>平台收益总额</b>
                        <Input readOnly={true}  value={this.state.userList[0].PlatformEarnings}   append="元"/>
                    </label>
                </Card>
                <Card className="box-card">
                    <label htmlFor="">
                        <b>开始时间</b>
                        <DatePicker
                            value={this.state.startDate}
                            placeholder="选择日期"
                            onChange={date=>{
                                this.setState({startDate:date},()=>{
                                    this.getList()
                                })
                            }}
                        />
                    </label>
                    <label htmlFor="">
                        <b>结束时间</b>
                        <DatePicker
                            value={this.state.endDate}
                            placeholder="选择日期"
                            onChange={date=>{
                                this.setState({endDate:date},()=>{
                                    this.getList()
                                })
                            }}
                        />
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
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns1}
                        data={this.state.userList}
                        border={true}
                    />
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns2}
                        data={this.state.userList}
                        border={true}
                    />
                        <h3>第一大模块字段：</h3>
                        <p>用户账户余额（用户平台上所有的余额总和）</p>
                        <p>咨询师账户余额（咨询师平台上所有的余额总和）</p>
                        <p>平台收益总额（目前等于咨询服务中，平台占比收益的总费用=交易完成*？%的总和，后续还会加上其他费用，比如证书的平台收益总费用）</p>
                    <p>
                        <h3>第二大模块字段：</h3>
                        <p>充值金额：用户和咨询师充值的总金额</p>
                        <p>充值人数：用户和咨询师充值的人数之和</p>
                        <p>充值笔数：用户和咨询师充值次数之和（充值笔数大于等于充值人数）</p>
                        <p>下单金额：（未付款+已付款待确认+已确认待咨询+已咨询待评价+交易关闭+交易完成）所有状态的总金额</p>
                        <p>下单人数：用户下单总人数</p>
                        <p>下单笔数：用户下单总次数（下单笔数大于等于下单人数）</p>
                        <p>支付成功人数：用户（已付款待确认）的订单状态的人数总和</p>
                        <p>支付成功笔数：用户（已付款待确认）的订单状态的次数总和，（支付成功笔数大于等于支付成功人数）</p>
                        <p>待支付金额：订单状态为（未付款）的金额总和</p>
                       <p>已支付金额：订单状态为（已付款待确认）的金额总和</p>
                       <p>待确认金额：订单状态为（已付款待确认）的金额总和</p>
                       <p>待咨询金额：订单状态为（已确认待咨询）的金额总和</p>
                       <p>待评价金额：订单状态为（已确认待评价）的金额总和</p>
                       <p>交易完成金额：订单状态为（交易完成）的金额总和</p>
                       <p>交易关闭金额：订单状态为（交易关闭）的金额总和</p>
                       <p>退款金额（支付后关闭订单）：后台对于订单状态为（已付款待确认，已确认待咨询，已咨询待评价）的订单，进行订单关闭操作时，所有关闭订单的总金额</p>
                       <p>咨询师收益：所有订单状态为（交易完成）的金额总和乘以咨询师收益百分比？%的总和</p>
                       <p>平台服务费：所有订单状态为（交易完成）的金额总和乘以平台收益百分比？%的总和</p>
                       <p>用户提现金额：所有用户提现总金额</p>
                       <p>咨询师提现金额：所有咨询师提现总金额</p>
                    </p>

                </Card>

            </div>
        );
    }
}

