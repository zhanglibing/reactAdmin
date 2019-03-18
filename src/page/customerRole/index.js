import React, {Component} from 'react';
import {Button, Table, Card, Pagination, Select, Input,MessageBox,Message} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import api from '../../api/user.js'
import './index.scss'
export default class CustomerRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList:[],
        }
    }
    componentWillMount() {
        this.getRoles()
    }
    //获取角色列表
    getRoles(){
        api.getRoleList(true).then(res=>{
            this.setState({
                roleList:res
            })
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
                label: "角色名称",
                prop: "Name",
            },
            {
                label: "系统名称",
                prop: "SystemName",
            },
            {
                label: "是否启用",
                prop: "Active",
                render:(data)=>{
                    let tag=data.Active?<div className="el-icon-circle-check"></div>:<div className="el-icon-circle-close"></div>;
                    return tag;
                }
            },
            {
                label: "是否系统角色",
                prop: "IsSystemRole",
                render:(data)=>{
                    let tag=data.IsSystemRole?<div className="el-icon-circle-check"></div>:<div className="el-icon-circle-close"></div>;
                    return tag;
                }
            },
            {
                label: "操作",
                width: 200,
                render: (data) => {
                    return (
                        <div>
                            <Button size="small" type="info" icon="edit">编辑</Button>
                            <Button size="small" disabled={data.IsSystemRole} type="danger" icon="delete" onClick={this.deleteCustomer.bind(this,data.Id)}>编辑</Button>
                        </div>);
                }
            },
        ];
        return (
            <div>
                <PageTitle title="客户角色"/>
                <Card className="box-card">
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        data={this.state.roleList}
                        border={true}
                    />
                </Card>
            </div>
        );
    }
}

