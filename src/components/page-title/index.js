import React from 'react'
import './index.scss'
export default class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.title=this.props.title;
    }
    render(){
        return (
            <div className="pageTitle">
                {
                    this.props.title!='登录'?<h2 className="title">{this.props.title}</h2>:null
                }
                {this.props.children}
            </div>
        )
    }
}