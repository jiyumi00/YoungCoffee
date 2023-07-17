import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Constant {
    static serviceURL = "http://203.241.251.177/ycoffee";

    static async getUserInfo() {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if(userInfo!=null) {
            return JSON.parse(userInfo);
        }
        return {userID:0}
    }
}