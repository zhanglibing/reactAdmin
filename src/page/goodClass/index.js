import React, {Component} from 'react';
import {Button, Table, Card, Pagination,MessageBox,Message} from 'element-react';
import 'element-theme-default';
import PageTitle from '../../components/page-title/index'
import api from '../../api'
import './index.scss'
export default class GoodClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GoodClassList:[],
        }
    }
    componentWillMount() {
        this.getGoodClass()
    }
    //获取商品分类
    getGoodClass(){
        api.good.getClass().then(res=>{
            this.setState({
                GoodClassList:res
            })
        })
    }
    //删除商品分类
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
                label: "名称",
                prop: "Name",
            },
            {
                label: "已发布",
                prop: "Active",
                render:(data)=>{
                    let tag=data.Published?<div className="el-icon-circle-check"></div>:<div className="el-icon-circle-close"></div>;
                    return tag;
                }
            },
            {
                label: "显示顺序",
                prop: "DisplayOrder",
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
                <PageTitle title="商品分类">
                    <Button type="primary">添加</Button>
                </PageTitle>
                <Card className="box-card">
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        data={this.state.GoodClassList}
                        border={true}
                    />
                </Card>
            </div>
        );
    }
}

