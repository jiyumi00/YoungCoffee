import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DownloadIcon from '@mui/icons-material/Download';

import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";
import PageHeader from "../../util/page_header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalTaxDetail from '../tax_manager/modal_tax_detail';

import Pagenation2 from "../../util/pagenation2";

export default class TaxManager extends Component {
    constructor(props) {
        super(props);


        this.approval = Constant.getTaxApproval();
        this.sales = Constant.getSales();

        this.itemCountPerPage = 12; //한페이지당 보여질 리스트 갯수
        this.pageCountPerPage = 5;

        this.contents = []; //서버에서 가져온 원본 contents


        this.state = {
            modalVisible: false, //상품 모달

            taxContents: [], //정산정보데이터
            item: [],
            selectedItemIndex: null,

            userRegisterModalVisible: false,
            approve: this.approval[0].value, //승인여부 드롭박스 All:전체 , 0:정산됨 , 1:정산안됨
            sale: this.sales[0].value, //판매건수 드롭박스 2:전체, max:높은순, min:낮은순

            date: 0,  // 0: 전체, 1:today, 2:month, 배열:기간
            dateRange: [], //기간 범위
            searchText: '',

            currentPage: 1,      // 현재 페이지 (setCurrentPage()에서 변경됨)
            offset: 0,            //현재페이지에서 시작할 item index


        }
    }

    componentDidMount() {
        if(sessionStorage.getItem('userID')!==0 && sessionStorage.getItem('userID') !== null){
            this.callGetSettledListAPI().then((response) => {
                console.log('무슨 회원이 접근한거야???',sessionStorage.getItem('userID'));
                this.contents = response;
                this.setState({ taxContents: this.contents });
                console.log('지점별 리스트 = ', response);
            });
          }
          else{
            alert('잘못된 접근입니다.');
          }

        


    }

    //지점별 정산/미정산 리스트 호출 
    async callGetSettledListAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/admin/GetSettledList");
        let response = await manager.start();
        if (response.ok)
            return response.json();

    }

    async callGetSettledExcelAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/admin/GetSettledExcel");
        let response = await manager.start();
        if (response.ok)
            return response.blob();
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


    //기간설정리스너
    onDateListener = (date) => {
        console.log('date', date)
        this.setState({ date: date })
        this.setState({ taxContents: this.dataFiltering(date, this.state.searchText, this.state.approve, this.state.sale) })
    }
    onDateRangeListener = (dates) => {
        this.setState({ date: dates })
        this.setState({ taxContents: this.dataFiltering(dates, this.state.searchText, this.state.approve, this.state.sale) });
    }
    //검색리스너
    searchTextListener = (text) => {
        this.setState({ searchText: text })
        this.setState({ taxContents: this.dataFiltering(this.state.date, text, this.state.approve, this.state.sale) })
    }

    //정산여부리스너
    selectApproveListener = (value) => {
        console.log(this.approval)
        this.setState({ approve: value })
        this.setState({ taxContents: this.dataFiltering(this.state.date, this.state.searchText, value, this.state.sale) })
    }

    //기간설정에 따른 데이터필터링
    dataFiltering(date, text, approve, sale) {
        console.log('date: ', date)
        console.log('text: ', text)
        console.log('approve: ', approve)
        console.log('sale: ', sale)
        let filteredContents = this.contents;

        filteredContents = filteredContents.filter((item) => {
            if (date === 1)
                return Constant.isSameMonth(new Date(item.registerDate))
            else if (date === 2)
                return Constant.isThreeMonth(new Date(item.registerDate))
            else if (date === 3)
                return Constant.isSixMonth(new Date(item.registerDate))
            else if (date.length === 2)
                return new Date(item.registerDate) >= date[0] && new Date(item.registerDate) <= date[1]
            else
                return true

        })

        filteredContents = filteredContents.filter((item) => {
            console.log('keyword: ', text)
            if (item.cmpName.includes(text))
                return true
        });

        filteredContents = filteredContents.filter((item) => {
            if (approve === this.approval[0].value)
                return true;
            else
                return item.complete === approve
        })

        filteredContents = filteredContents.filter((item) => {
            if (sale === this.sales[0].value)
                return true;
            else
                return item.sale === sale
        })

        return filteredContents

    }
    render() {
        //console.log('approval', this.state.approval)
        //console.log('sale', this.state.sale)
        return (

                <Container>
                    {/* 서브탑메뉴바 영역 */}
                    <nav className="topcontents topmenubar w-100">
                        <div className="d-flex topmenubar">
                            <Box style={{ marginRight: '15px' }} sx={{ minWidth: 190 }} >
                                <FormControl fullWidth>
                                    <InputLabel>마감여부</InputLabel>
                                    <Select
                                        value={this.state.approve}
                                        label="마감여부"
                                        onChange={(e) => this.selectApproveListener(e.target.value)}>
                                        {this.approval.map((item, i) => <MenuItem value={item.value} key={i}>{item.title}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <PageHeader onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} searchTextListener={(text) => this.searchTextListener(text)} />
                    </nav>

                    {
                        this.state.modalVisible && <ModalTaxDetail item={this.state.item} hideButtonClicked={this.setItemIndex} />
                    }
                    {/* 테이블 영역 */}
                    <div className="middlecontents">
                    <Table hover style={{height:'75vh'}}>
                        <thead>
                            <tr>
                                <th>년-월</th>
                                <th>가맹점 명</th>
                                <th>주소</th>
                                <th>전화번호</th>
                                <th>마감여부</th>
                                <th>다운로드</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 튜플영역을 map을 사용하여 하나씩 받아와 뿌려주도록 구성함 */}
                            {
                                this.contents.length === 0 ? <tr><td colSpan={5}>비었습니다.</td></tr> : <>

                                    {/* 튜플영역을 map을 사용하여 하나씩 받아와 뿌려주도록 구성함 */}
                                    {
                                        this.state.taxContents.slice(this.state.offset, this.state.offset + this.itemCountPerPage).map((item, i) =>
                                            <ListItem item={item} key={i} modalVisible={this.state.modalVisible} excelDownListener={(item) => this.getExcel(item)} listener={(item) => this.setItemIndex(item)} />)
                                    }

                                </>
                            }
                        </tbody>
                    </Table>
                    </div>
                    <div className="bottomcontents w-100 p-2">
                        {this.state.taxContents.length > 0 && (
                            <Pagenation2 itemCount={this.state.taxContents.length} pageCountPerPage={this.pageCountPerPage} itemCountPerPage={this.itemCountPerPage} currentPage={this.state.currentPage} clickListener={this.setCurrentPage} />
                        )}</div>
                </Container>




        );
    }
}


//--------------------------------------------------------------------------------------------------------
// 테이블에 데이터를 뿌려주는 클래스
class ListItem extends Component {
    constructor(props) {
        super(props);
      
    }

    onClicked = () => {
        if (window.confirm("다운로드하시겠습니까?")) {

            if (this.props.item.complete == 1) {
                const element = document.createElement('a');
                const url = Constant.serviceURL + "/admin/GetSettledExcel?user_id=" + this.props.item.userID + "&day=" + this.props.item.belongDate;
                console.log('excel down url = ', url);
                element.href = url;
                document.body.appendChild(element);
                element.click();
            }
        }

    }
    modalOnclickListener=()=>{
        this.props.listener(this.props.item);
    }

    render() {
        const item = this.props.item;
        return (
            <tr onClick={this.modalOnclickListener}>
                <td>{item.belongDate}</td>
                <td>{item.cmpName}</td>
                <td>{item.cmpAddress}</td>
                <td>{item.cmpTel}</td>
                {/* 0:미정산, 1:정산 */}
                {item.complete === 1
                    ? (<>
                        <td>O</td>
                        <td><DownloadIcon className="downloadButton" onClick={this.onClicked} /></td>
                    </>)
                    : (<>
                        <td>X</td>
                        <td> </td>
                    </>)
                }

            </tr>
        )

    }
}