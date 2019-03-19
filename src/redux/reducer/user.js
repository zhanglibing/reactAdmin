
//获取session值
function getSessionByName(name){
    var val={};
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

//注意不要直接修改state  否则state修改 可能出现不会更新组件
// 使用Object.assign({},state,{userInfo:payload})  或者{...state,userInfo:payload}
export default function (state = initialState, action) {
    let {type,payload}=action;
    switch (type) {
        case "SET_USERINFO": {
            setSessionVal('adminUserInfo',payload);
            // return Object.assign({},state,{userInfo:payload})
            return {
                ...state,
                userInfo:payload
            }
        }
        default:
            return state;
    }
}
