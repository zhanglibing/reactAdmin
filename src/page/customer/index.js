import React, {Component} from 'react';
import {Button, Table, Card, Pagination, Select, Input,MessageBox,Message} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import api from '../../api'
import './index.scss'
export default class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            Total: 0,
            pageSize: 20,
            Page: 1,
            statusForConsultant: 0,
            RealName: '',
            Username: '',
            RoleIds: '',
            audit: [
                {name: '所有', id: 0},
                {name: '已审核', id: 4},
                {name: '未审核', id: 2},
            ],
            roleList:[],
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
        let {pageSize, Page, RealName, statusForConsultant, Username, RoleIds} = this.state;
        api.user.getUserList( {
            pageSize,
            Page,
            RealName,
            statusForConsultant,
            Username,
            RoleIds
        }).then(res => {
            let {Data, Total} = res;
            console.log(Data)
            this.setState({
                userList: Data,
                Total:Total
            })

        }).then(data => {

        })
    }
    //获取角色列表
    getRoles(){
        api.user.getRoleList().then(res=>{

            this.setState({
                roleList:res
            })
        })
    }
    customerChange(name, val) {
        this.setState({
            [name]: val
        },() => {
            this.getList()
        })
    }
    //删除用户
    deleteCustomer(id){
        // this.props.history.push('/list') //跳转页面
        MessageBox.confirm('确认删除该用户吗?', '提示', {
            type: 'warning'
        }).then(() => {
            Message({
                type: 'success',
                message: '删除成功!'
            });
        })
    }

    render() {
        let columns= [
            {
                label: "用户名(手机号)",
                prop: "Username",
                width: 140,
            },
            {
                label: "真实姓名",
                prop: "RealName",
                width: 120,
            },
            {
                label: "昵称",
                prop: "NickName",
                width: 140
            },
            {
                label: "客户角色",
                prop: "CustomerRoleNames",
                width: 140
            },
            {
                label: "已启用",
                prop: "OrderType",
                width: 120,
                render:(data)=>{
                    let tag=data.Active?<div className="el-icon-circle-check"></div>:<div className="el-icon-circle-close"></div>;
                    return tag;
                }
            }, {
                label: "创建日期",
                prop: "CreatedOn",
                minWidth: 150
            },
            {
                label: "最后活动日期",
                prop: "LastActivityDate",
                minWidth: 150
            },
            {
                label: "操作",
                width: 200,
                render: (data) => {
                    return (
                        <div>
                            <Button size="small" type="info" icon="edit">编辑</Button>
                            <Button size="small" type="danger" icon="delete" onClick={this.deleteCustomer.bind(this,data.Id)}>编辑</Button>
                        </div>);
                }
            },
        ];
        return (
            <div>
                <PageTitle title="客户管理"/>
                <Card className="box-card">
                    <label htmlFor="">
                        <b>用户手机号</b>
                        <Input value={this.state.Username} placeholder="请输入内容" onChange={this.customerChange.bind(this,'Username')} />
                    </label>
                    <label htmlFor="">
                        <b>用户姓名</b>
                        <Input value={this.state.RealName}  placeholder="请输入内容" onChange={this.customerChange.bind(this,'RealName')} />
                    </label>
                    <label htmlFor="">
                        <b>客户角色</b>
                        <Select value={this.state.RoleIds} clearable={true}
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
                        <Select value={this.state.OrderType} onChange={this.customerChange.bind(this, 'OrderType')}>
                            {
                                this.state.audit.map(el => {
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
            </div>
        );
    }
}

