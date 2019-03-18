
import React from 'react'
import { Upload,Message} from 'element-react';
import 'element-theme-default';
import './index.scss'
export default class UploadImg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
        };
    }
    componentWillMount(){

    }

    render() {
        const { imageUrl } = this.state;
        return (
            <Upload
                className="avatar-uploader"
                action="http://back.jizhaojk.com/Admin/PictureHandle/AsyncUploadNew"
                showFileList={false}
                onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
                beforeUpload={file => this.beforeAvatarUpload(file)}
            >
                { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"></i> }
            </Upload>
        )
    }

    handleAvatarScucess(res, file) {
        let {Code, Picture} = res;
        this.setState({ imageUrl: URL.createObjectURL(file.raw) });
        if(Code==200){
            this.props.getUploadImgId(Picture.pictureId)
            Message.success('上传成功')
        }

    }

    beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 4;
        // if (!isJPG) {
        //     Message('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
            Message('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M;
        return isLt2M;
    }
}



