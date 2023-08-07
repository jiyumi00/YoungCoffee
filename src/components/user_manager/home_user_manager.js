import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";
import PageHeader from "../../util/page_header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalUserDetail from '../user_manager/modal_user_detail';
import ModalUserRegister from '../user_manager/modal_user_register'
import MyStorage from '../../util/redux_storage';

import Pagenation2 from "../../util/pagenation2";

//login={"userID":6,"passwd":"1234"}

export default class UserManager extends Component {
    constructor(props) {
        super(props);

        this.itemCountPerPage = 12; //한페이지당 보여질 리스트 갯수
        this.pageCountPerPage = 5;

        this.contents = []; //서버에서 가져온 원본 contents


        this.state = {
            modalVisible: false, //상품 모달

            userContents: [], //회원정보데이터
            item: [],
            selectedItemIndex: null,

            userRegisterModalVisible: false,

            searchText: '',

            currentPage: 1,      // 현재 페이지 (setCurrentPage()에서 변경됨)
            offset: 0,            //현재페이지에서 시작할 item index


        }
    }

    componentDidMount() {
        if(sessionStorage.getItem('userID')!==0 && sessionStorage.getItem('userID') !== null){
            this.unsubscribe = MyStorage.subscribe(this.onStorageChange);
            this.getUsers();
          }
          else{
            alert('잘못된 접근입니다.');
          }
        // this.unsubscribe = MyStorage.subscribe(this.onStorageChange);
        // this.getUsers();


    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStorageChange = () => {
        this.getUsers();
    }

    getUsers() {
        this.callGetUsersAPI().then((response) => {
            this.contents = response;
            this.setState({ userContents:this.contents })
        });
    }
    

    //회원 정보 가져오는 API
    async callGetUsersAPI() {
        console.log('사용자 리스트에서 세선값 = ', sessionStorage.getItem("userID"));
        const userID = parseInt(sessionStorage.getItem("userID"));
        const passwd = sessionStorage.getItem("passwd");
        let manager = new WebServiceManager(Constant.serviceURL + "/admin/GetUsers", "post");
        manager.addFormData("login", { userID: userID, passwd: passwd });
        let response = await manager.start();
        if (response.ok)
            return response.json();

    }

    //프로젝트 리스트에서 하나의 아이템을 선택하면 DetailPopup창을 띄우고 현재 선택된 아이템의 index 설정
    setItemIndex = (item) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            item: item
        });
    }
    //Pagenation에서 몇페이지의 내용을 볼지 선택 (페이지를 선택하면 현재의 페이지에따라 offset 변경)
    setCurrentPage = (page) => {
        let lastOffset = (page - 1) * this.itemCountPerPage;
        this.setState({ currentPage: page, offset: lastOffset });
    };



    //검색리스너
    searchTextListener = (text) => {
        this.setState({ searchText: text })
        this.setState({ userContents: this.dataFiltering(text) })
    }


    //기간설정에 따른 데이터필터링
    dataFiltering(text) {
        console.log('text: ', text);

        let filteredContents = this.contents;

        filteredContents = filteredContents.filter((item) => {
            console.log('keyword: ', text)
            if (item.cmpName.includes(text))
                return true
        });
        return filteredContents

    }

    render() {
        return (
 
         
                <Container>
                    <nav className="topcontents topmenubar w-100">
                        <div className="d-flex topmenubar">
                            <button className="sideColor" onClick={() => { this.setState({ userRegisterModalVisible: true }) }}>회원등록 <PersonAddIcon /></button>
                        </div>
                        <PageHeader onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} searchTextListener={(text) => this.searchTextListener(text)} />
                    </nav>
                    {
                        this.state.userRegisterModalVisible && <ModalUserRegister hideButtonClicked={() => { this.setState({ userRegisterModalVisible: false }) }} onRefresh={this.getUsers}/>
                    }
                    {
                        this.state.modalVisible && <ModalUserDetail item={this.state.item} hideButtonClicked={this.setItemIndex} />
                    }
                    <div className="middlecontents">
                    <Table hover style={{height:'75vh'}}>
                        <thead>
                            <tr>
                                <th>가맹점 명</th>
                                <th>사업자번호</th>
                                <th>전화번호</th>
                                <th style={{ width: '20%' }}>주소</th>
                                <th>대표자이름</th>
                                <th>사용여부</th>
                            </tr>
                        </thead>
                        <tbody >
                        {
                            this.contents.length === 0 ? <tr><td colSpan={6}>비었습니다.</td></tr> : <>
                            
                                {/* 튜플영역을 map을 사용하여 하나씩 받아와 뿌려주도록 구성함 */}
                               
                                    {
                                    
                                        this.state.userContents.slice(this.state.offset, this.state.offset + this.itemCountPerPage).map((item, i) =>
                                            <UserManagerItems item={item} key={i} listener={(item) => this.setItemIndex(item)}  />)
                                    }
                              

                            </>
                        }
                          </tbody>
                    </Table>
                    </div>
                   
                    <footer  className="bottomcontents">
                        {this.state.userContents.length > 0 && (
                            <Pagenation2 itemCount={this.state.userContents.length} pageCountPerPage={this.pageCountPerPage} itemCountPerPage={this.itemCountPerPage} currentPage={this.state.currentPage} clickListener={this.setCurrentPage} />
                        )}</footer>
                </Container>




        );
    }
}


//--------------------------------------------------------------------------------------------------------
// 테이블에 데이터를 뿌려주는 클래스
class UserManagerItems extends Component {
    constructor(props) {
        super(props);

    }
    onClickListener = () => {
        this.props.listener(this.props.item);
    }
    render() {
        const item = this.props.item;
        return (
            <tr  onClick={this.onClickListener}>
                <td>{item.cmpName}</td>
                <td>{Constant.transformCmpNo(item.cmpNo)}</td>
                <td>{Constant.transformPhoneNumber(item.cmpTel)}</td>
                <td>{item.cmpAddress}</td>
                <td>{item.repName}</td>
                {/* 0:승인됨, 1:승인안됨 */}
                {item.validate === 1
                    ? (<td>O</td>)
                    : (<td>X</td>)
                }
            </tr>
        )

    }
}