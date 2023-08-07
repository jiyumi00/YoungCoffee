import {legacy_createStore as createStore} from "redux";

const loginState={userID:parseInt(sessionStorage['userID']),passwd:sessionStorage['passwd']};

function reducer (state=loginState, action)  {
    //console.log('리덕스에서의 값들 = ',action.data);
    switch(action.type) {
        case "Login":
            sessionStorage.setItem('userID',action.data.userID);
            sessionStorage.setItem('passwd',action.data.passwd);
            sessionStorage.setItem('path','/UserInfo');
            //state.userID=action.data.userID;
            //state.passwd=action.data.passwd;
            //console.log('리덕스에서 변화된 값 = ',state);
            return state,{userID:action.data.userID,passwd:action.data.passwd};
        case "Logout" :
            sessionStorage.setItem('userID',0);
            sessionStorage.setItem('passwd','');
            sessionStorage.setItem('path','/');
            return {...state, userID:0, passwd:''};
        default:
            return {...state, state};
    }
};

export default createStore(reducer);