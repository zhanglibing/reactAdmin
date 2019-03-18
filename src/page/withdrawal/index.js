import React, {Component} from 'react';
import {Button, Table, Card, Pagination, Select, Tag, Message, Input} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import UploadImg from '../../components/uploadImg/index'
import api from '../../api'
import './index.scss'
export default class Withdrawal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpload: false,
            activeId: '',
            PictureId:'',
            roleList: [],
            userList: [1],
            Total: 0,
            pageSize: 20,
            Page: 1,
            Status: -1,
            RealName: '',
            Username: '',
            RoleIds: '',
            showImgUrl: '',
            StatusType: [
                {name: '所有', id: -1},
                {name: '待审核', id: 0},
                {name: '已审核，待转账', id: 1},
                {name: '完成转账', id: 2},
            ],
        }
    }

    componentWillMount() {
        this.getList();
        this.getRoles()
    }

    //跳转页面
    goPage(index) {
        this.setState({
            Page: index
        })
        setTimeout(() => {
            this.getList()
        })
    }

    onSizeChange(size) {
        this.setState({
            pageSize: size
        })
        setTimeout(() => {
            this.getList()
        })
    }

    //获取列表
    getList() {
        let {pageSize, Page, Status, RealName, Username, RoleIds} = this.state;
        api.money.getList({pageSize, Page, Status, RealName, Username, RoleIds}).then(res => {
                let {Data, Total} = res;
                this.setState({
                    userList: Data,
                    Total
                })
        })
    }

    //确认审核通过
    submitApproved(id) {
        api.money.withdrawalStatus(  {Id: id, Status: 1, PictureId: 0}).then(res => {
            Message.success('审核已成功通过')
            this.getList();
        })
    }

    //确认凭证上传
    submitUpload() {
        let option = {
            Id: this.state.activeId,
            Status: 2,
            PictureId: this.state.PictureId
        }
        api.money.withdrawalStatus( option).then(res => {
            this.hideUpload()
            Message.success('转账凭证已提交')
            this.getList();
        })
    }

    //获取查看上传的凭证
    getUploadImg(id, e) {
        api.money.getImg(id).then(res => {
            console.log(res)
            this.setState({
                showImgUrl: res
            })
        })
    }

    //隐藏查看图片
    hideShowImg() {
        this.setState({
            showImgUrl: ''
        })
    }

    //获取角色列表
    getRoles() {
        api.user.getRoleList().then(res => {
            this.setState({
                roleList: res
            })
        })
    }

    customerChange(name, val) {
        this.setState({
            [name]: val
        }, () => {
            this.getList()
        })
    }

    //隐藏上传凭证框
    hideUpload() {
        this.setState({
            isUpload: false,
            activeId: '',
            PictureId:'',
        })
    }

    //显示上传凭证框
    showUpload(id) {
        this.setState({
            isUpload: true,
            activeId: id
        })
    }

    getUploadImgId(id){
        this.setState({PictureId:id})
    }
    render() {
        let columns = [
            {
                label: "用户名(手机号)",
                prop: "Username",
                width: 160,
            },
            {
                label: "持卡人姓名",
                prop: "BankUserName",
                width: 120,
            },
            {
                label: "银行卡",
                prop: "BankCardNo",
            },
            {
                label: "银行卡机构",
                prop: "Banktype",
                width: 140
            },
            {
                label: "提现金额(元)",
                prop: "money",
                width: 140
            }, {
                label: "申请日期",
                prop: "CreateDate",
                width: 150,
            }, {
                label: "当前状态",
                prop: "Status",
                width: 150,
                render: (data) => {
                    let btn = data.Status == 0 ?
                        <Tag type="danger">待审核</Tag>
                        : data.Status == 1 ? <Tag type="success">已审核，待转账</Tag>
                            : <Tag type="primary">已完成转账</Tag>
                    return btn;
                }
            },
            {
                label: "操作",
                prop: "CreateDate",
                width: 170,
                render: (data) => {
                    let btn = data.Status == 0 ?
                        <Button size="small" type="success"
                                onClick={this.submitApproved.bind(this, data.Id)}>确认审核</Button>
                        : data.Status == 1 ? <Button size="small" type="warning"
                                                     onClick={this.showUpload.bind(this, data.Id)}>上传凭证</Button>
                            : <Button size="small" type="info"
                                      onClick={this.getUploadImg.bind(this, data.TransferVoucher)}>查看凭证</Button>
                    return btn;
                }
            }
        ]
        return (
            <div>
                <PageTitle title="提现申请"/>
                <Card className="box-card">
                    <label htmlFor="">
                        <b>用户(手机号)</b>
                        <Input placeholder="手机号" onChange={this.customerChange.bind(this, 'Username')}/>
                    </label>
                    <label htmlFor="">
                        <b>真实姓名</b>
                        <Input type="text" placeholder="真实姓名" onChange={this.customerChange.bind(this, 'RealName')}/>
                    </label>
                    <label htmlFor="">
                        <b>客户角色</b>
                        <Select value={this.state.RoleIds}
                                onChange={this.customerChange.bind(this, 'RoleIds')}>
                            {
                                this.state.roleList.map(el => {
                                    return <Select.Option key={el.Id} value={el.Id} label={el.Name}/>
                                })
                            }
                        </Select>
                    </label>
                    <label htmlFor="">
                        <b>审核状态</b>
                        <Select value={this.state.Status} onChange={this.customerChange.bind(this, 'Status')}>
                            {
                                this.state.StatusType.map(el => {
                                    return <Select.Option key={el.id} value={el.id} label={el.name}/>
                                })
                            }
                        </Select>
                    </label>
                    <Button type="primary" icon="search" onClick={this.getList.bind(this)}>搜索</Button>
                </Card>
                <Card className="box-card">
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        data={this.state.userList}
                        stripe={true}
                        border={true}
                    />
                    <div className="pagin">
                        <Pagination layout="total, sizes, prev, pager, next, jumper"
                                    total={this.state.Total}
                                    pageSizes={[20, 30, 40, 50]}
                                    pageSize={this.state.pageSize}
                                    currentPage={this.state.Page}
                                    onCurrentChange={this.goPage.bind(this)}
                                    onSizeChange={this.onSizeChange.bind(this)}
                        />
                    </div>
                </Card>
                {/*查看凭证*/}
                {
                    this.state.showImgUrl ? <div className="imgBox" onClick={this.hideShowImg.bind(this)}>
                        <img src={this.state.showImgUrl} alt=""/>
                    </div> : null
                }
                {
                    this.state.isUpload ? <div className="uploadBox">
                        <Card className="content">
                            <UploadImg id={this.state.activeId} getUploadImgId={this.getUploadImgId.bind(this)}/>
                            <Button onClick={this.hideUpload.bind(this)}>取消</Button>
                            <Button type="primary" onClick={this.submitUpload.bind(this)}>确认</Button>
                        </Card>
                    </div> : null
                }

            </div>
        );
    }
}

