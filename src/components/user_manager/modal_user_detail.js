import React, { Component } from "react";
import { Button, Modal, CloseButton } from "react-bootstrap";

import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";


//UserInfo 상세보기 모달 클래스
export default class ModalUserDetail extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.item.id
        this.state = {
            companyNoImageURI: '', //companyNoImageURI:사업자등록증 사진
            cardImageURI: '' //cardImageURI:명함 사진
        }
    }
    approveButtonClicked = () => {
        alert('알림문자를 보냈습니다.')
    }

    componentDidMount() {
        // this.callGetCompanyImageAPI().then((response) => {
        //     this.setState({ companyNoImageURI: URL.createObjectURL(response) })
        // })
        // this.callGetcardImageAPI().then((response) => {
        //     this.setState({ cardImageURI: URL.createObjectURL(response) })
        // })
    }


    // //사업자등록증 사진을 가져오는 API
    // async callGetCompanyImageAPI() {
    //     let manager = new WebServiceManager(Constant.serviceURL + "/GetCompanyImage", "post");
    //     manager.addFormData("data", { userID: 28, passwd: "9999", id: this.id });//열람하고자 하는 id
    //     let response = await manager.start();
    //     if (response.ok) {
    //         return response.blob();
    //     }
    // }

    // //명함 사진을 가져오는 API
    // async callGetcardImageAPI() {
    //     let manager = new WebServiceManager(Constant.serviceURL + "/GetNamecardImage", "post");
    //     manager.addFormData("data", { userID: 28, passwd: "9999", id: this.id });//열람하고자 하는 id
    //     let response = await manager.start();
    //     if (response.ok) {
    //         return response.blob();
    //     }
    // }

    render() {
        const item = this.props.item;
        return (
            <div className="modal w-100 h-100" >

                <Modal.Dialog
                    size="mb"
                    centered>
                    <Modal.Header>
                        <Modal.Title>상세보기</Modal.Title>
                        <CloseButton onClick={this.props.hideButtonClicked} />
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <table className="w-100 background">
                                <tbody>
                                    <tr>
                                        <th className="rightBorder">가맹점 명</th>
                                        <td>{item.cmpName}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">사업자번호</th>
                                        <td>{Constant.transformCmpNo(item.cmpNo)}</td>

                                    </tr>
                                    <tr>
                                        <th className="rightBorder">전화번호</th>
                                        <td>{Constant.transformPhoneNumber(item.cmpTel)}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">주소</th>
                                        <td>{item.cmpAddress}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">대표자이름</th>
                                        <td>{item.repName}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">사용여부</th>
                                        {item.validate === 1 ? (<td>O</td>) : (<td>X</td>)}
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        {item.validate === 1 && <Button variant="primary" onClick={() => { this.approveButtonClicked() }}>승인</Button>}
                        <Button variant="primary" onClick={() => { this.approveButtonClicked() }}>수정</Button>
                        <Button variant="danger" onClick={() => { this.approveButtonClicked() }}>탈퇴</Button>
                    </Modal.Footer> */}
                </Modal.Dialog>


            </div>
        )
    }
}