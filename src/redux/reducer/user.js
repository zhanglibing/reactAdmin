
//获取session值
function getSessionByName(name){
    var val=0;
    if(sessionStorage[name]!="-1"&&sessionStorage[name]){
        val=JSON.parse(sessionStorage[name]);
    }
    return val;
}
//设置session值
function setSessionVal(name,val){
    sessionStorage[name]=JSON.stringify(val);
}

//初始化state
const initialState = {
    userInfo:getSessionByName('adminUserInfo')
};

//创建单个reducer 并且传入默认值state
export default function (state = initialState, action) {
    let {type,payload}=action;
    switch (type) {
        case "SET_USERINFO": {
            setSessionVal('adminUserInfo',payload);
            return {
                userInfo:payload
            }
        }
        default:
            return state;
    }
}
