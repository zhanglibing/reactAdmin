import {createStore,applyMiddleware,compose} from "redux"
import thunk from 'redux-thunk'
import reducer from "./reducer"

const middleware = [thunk];

let store=createStore(
    reducer,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

/*redux-thunk 是一个比较流行的 redux 异步 action 中间件，比如 action 中有 ****setTimeout**** 或者通过 ****fetch****通用远程 API 这些场景，
那么应该使用 redux-thunk 了。redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决，对 component 没有影响
 */

/*使项目与浏览器调试关联
* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 * */
export default store;