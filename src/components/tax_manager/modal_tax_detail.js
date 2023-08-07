import React, { Component } from "react";
import { Button, Modal, CloseButton } from "react-bootstrap";
import DownloadIcon from '@mui/icons-material/Download';
import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";


//taxinfo 상세보기 모달 클래스
export default class ModalTaxDetail extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.item.id
        this.state = {
            // companyNoImageURI: '', //companyNoImageURI:사업자등록증 사진
            // cardImageURI: '' //cardImageURI:명함 사진
        }
    }
    approveButtonClicked = () => {
        alert('수정되었습니다.')
    }
    deleteButtonClicked = () => {
        alert('삭제되었습니다.')
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
                        <div >
                            <table className="w-100 background">
                                <tbody>
                                    <tr>
                                        <th className="rightBorder">년-월</th>
                                        <td>{item.belongDate}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">가맹점 명</th>
                                        <td>{item.cmpName}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">전화번호</th>
                                        <td>{item.cmpTel}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">주소</th>
                                        <td>{item.cmpAddress}</td>
                                    </tr>
                                    <tr>
                                        <th className="rightBorder">마감여부</th>
                                        {item.complete === 1 ? (<td>O</td>) : (<td>X</td>)}
                                    </tr>
                                    <tr>


                                    </tr>
                                </tbody>

                            </table>
                        </div>


                    </Modal.Body>

                    <Modal.Footer>
                        {item.complete === 1 && <Button className="downloadButton" onClick={this.onClicked}>다운로드</Button>
                        }
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}