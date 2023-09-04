import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Constant {
    //static serviceURL = "http://203.241.251.177/ycoffee";
    //static serviceURL = "http://test.ycoffee.kr/ycoffee";
    static serviceURL = "https://young.ycoffee.kr/ycoffee/api/test";
    static async getUserInfo() {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if(userInfo!=null) {
            return JSON.parse(userInfo);
        }
        return {userID:0}
    }

    //전화번호에 - 넣기
    static transformPhoneNumber=(value)=> {
        return value.replace(/^(\d{3})(\d{4})(\d{4})$/g, "$1-$2-$3");
    }

    //주민등혹번호에 - 넣기
    static transformCNumber=(value)=> {
        return value.replace(/^(\d{6})(\d{7})$/g, "$1-$2");
    }

    static transformCmpNo=(value)=> {
        return value.replace(/^(\d{3})(\d{2})(\d{5})$/g, "$1-$2-$3");
    }
}