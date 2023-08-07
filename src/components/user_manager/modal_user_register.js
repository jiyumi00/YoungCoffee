import React, { Component } from "react";
import { Button, Modal, CloseButton, Form } from "react-bootstrap";
import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";
import CompanyNoImage from "../../images/companyNo.png";
import NameCardImage from "../../images/nameCard.png";


//login={"userID":6,"passwd":"1234"}
//data={"cmpNo":"0000000002","cmpName":"우리커피","cmpAddress":"김해시 어방동","cmpTel":"01099998888","repName":"박우리"}

//회원정보 등록 모달 클래스
export default class ModalUserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmpNo: '', //사업자등록 번호
            cmpName: '', //회사상호명
            cmpAddress: '', //사업자 주소
            cmpTel: '', //전화번호
            repName: '', //점주이름

            registerButtonVisible: false, //회원등록 버튼 활성화 체크변수
        }

    }

    //회원등록 활성화 함수
    onValueChange = (value) => {
        this.setState(value, () => {
            let isValidForm = true;

            if (this.state.cmpNo.trim().replaceAll("-", "").length < 10 ||this.state.cmpNo.trim().replaceAll("-", "").length > 10) // 조건 필요시 추가
                isValidForm = false;
            if (this.state.cmpAddress.trim().length === 0)
                isValidForm = false;
            if (this.state.cmpName.trim().length === 0)
                isValidForm = false;
            if (this.state.cmpTel.trim().length === 0)
                isValidForm = false;
            if (this.state.repName.trim().length === 0)
                isValidForm = false;


            this.setState({ registerButtonVisible: isValidForm })
        })

    }

    goAddUser = () => {
        this.callAddUserAPI().then((response) => {
            //console.log('adduser', response);
            //console.log('response.success', response.success);
            if (response.success === 0) {
                alert("계정추가에 실패하였습니다.");
            }            
            else {
                alert('가맹점이 등록되었습니다.');
                this.props.hideButtonClicked();
                this.props.onRefresh();

            }
        })

    }

    //modal user register
    async callAddUserAPI() {
        const login = { "userID": parseInt(sessionStorage.getItem("userID")), "passwd":sessionStorage.getItem("passwd") }
        const userData = {
            cmpNo: this.state.cmpNo.replace(/-/g, ''),
            cmpName: this.state.cmpName,
            cmpAddress: this.state.cmpAddress,
            cmpTel: this.state.cmpTel,
            repName: this.state.repName,
        };

        let manager = new WebServiceManager(Constant.serviceURL + "/admin/AddUser", "post");
        manager.addFormData("login", login); //addUser할 권한이 있는지 확인
        manager.addFormData("data", userData); //넣을 데이터

        //console.log(userData);
        let response = await manager.start();
        if (response.ok)
            return response.json();
    }


    render() {
        return (
            <div className="modal w-100" >
                <Modal.Dialog
                    size="md"
                    centered>
                    <Modal.Header>
                        <Modal.Title>회원등록</Modal.Title>
                        <CloseButton onClick={this.props.hideButtonClicked} />
                    </Modal.Header>
                    {/* 이미지 프리뷰 할지 고민중 */}
                    <Modal.Body>
                        <div>
                            <form>
                                {/* 회원정보 입력 */}

                                <div className="background">
                                    <label>가맹점 명</label>
                                    <Form.Control
                                        type='text' value={this.state.cmpName} onChange={(e) => { this.onValueChange({ cmpName: e.target.value }) }}
                                    />
                                </div>
                                <div className="background">
                                    <label>사업자번호</label>
                                    <Form.Control
                                        type='text' placeholder="사업자등록번호 10자리 -없이 입력해주세요." value={Constant.transformCmpNo(this.state.cmpNo)} onChange={(e) => { this.onValueChange({ cmpNo: e.target.value }) }}
                                    />
                                </div>
                                <div className="background">
                                    <label>전화번호</label>
                                    <Form.Control
                                        type='text' placeholder="전화번호 -없이 입력해주세요." value={Constant.transformPhoneNumber(this.state.cmpTel)} onChange={(e) => { this.onValueChange({ cmpTel: e.target.value }) }}
                                    />
                                </div>
                                <div className="background">
                                    <label>주소</label>
                                    <Form.Control
                                        type='text' as="textarea" cols="2" value={this.state.cmpAddress} onChange={(e) => { this.onValueChange({ cmpAddress: e.target.value }) }}
                                    />
                                </div>
                                <div className="background">
                                    <label>대표자이름</label>
                                    <Form.Control
                                        type='text' value={this.state.repName} onChange={(e) => { this.onValueChange({ repName: e.target.value }) }}
                                    />
                                </div>

                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.registerButtonVisible === true ? <Button variant="primary" onClick={this.goAddUser} >회원등록</Button> : <Button variant="secondary" disabled>회원등록</Button>}
                    </Modal.Footer>
                </Modal.Dialog>

            </div >

        )
    }
}