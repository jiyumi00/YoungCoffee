import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default class Constant{
    static serviceURL="http://test.ycoffee.kr/ycoffee"; 
    //영커피로 바꿔야함

    static getSideMenus(){
        return  [
            { key:1, name: "회원관리", href: "/UserInfo", icon: <PersonIcon /> },
            { key:2, name: "정산관리", href: "/TaxInfo", icon: <MonetizationOnIcon /> },
        ];
    }

    static DateToString(date){
        let year=date.getFullYear();
        let month=date.getMonth() + 1;
        let day=date.getDate();
        return `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`
    }
    
    static isSameDate=(date)=>{
        let today=new Date()
        return date.getFullYear()===today.getFullYear()
        && date.getMonth()===today.getMonth()
        && date.getDate()===today.getDate();
    }
    static isSameMonth=(date)=>{
        let today=new Date()
        return date.getMonth()===today.getMonth()
    }
    //user_manager approval dropdownbox
    static getApproval(){
        return [
            {value:"All", title:"전체"},
            {value:0, title:"승인됨"},
            {value:1, title:"승인안됨"}
        ];
    }
    //user_mannager sale dropdownbox
    static getSales(){
        return [
            {value:"All", title:"전체"},
            {value:"Max", title:"높은순"},
            {value:"Min", title:"낮은순"}
        ];
    }

     //user_manager approval dropdownbox
     static getTaxApproval(){
        return [
            {value:"All", title:"전체"},
            {value:1, title:"마감완료"},
            {value:0, title:"마감전"}
        ];
    }

    static isLoggedIn() {
        console.log('session storage = ',sessionStorage.getItem("userID"));
        return (sessionStorage.getItem("userID")=="" || sessionStorage.getItem("passwd")=="");
    }

    //전화번호에 - 넣기
    static transformPhoneNumber=(value)=> {
        return value.replace(/^(\d{3})(\d{4})(\d{4})$/g, "$1-$2-$3");
    }

    //주민등혹번호에 - 넣기
    static transformCNumber=(value)=> {
        return value.replace(/^(\d{6})(\d{7})$/g, "$1-$2");
    }

    //사업자등록증에 -넣기
    static transformCmpNo=(value)=> {
        return value.replace(/^(\d{3})(\d{2})(\d{5})$/g, "$1-$2-$3");
    }
}

