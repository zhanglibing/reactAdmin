
//保存用户登录信息
const setUserInfo = obj => {
    return {
        type: 'SET_USERINFO',
        payload: obj
    }
}


export {
    setUserInfo,
}