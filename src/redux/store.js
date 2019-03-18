import {createStore,applyMiddleware} from "redux"
import reducer from "./reducer"
// import { composeWithDevTools } from 'redux-devtools-extension'

let store=createStore(reducer)

// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text:'测试直接新增',
//         id:1
//     }
// });

export default store;