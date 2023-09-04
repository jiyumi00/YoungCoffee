import React, {Component, useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import dayjs, {extend} from 'dayjs';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import ToggleButton from '../../components/common/ToggleButton';
import Image from '../../components/common/Image';
import SettingHeader from '../../components/setting/SettingHeader';
import Text from '../../components/common/Text';
import UserInfoItemBox from '../../components/setting/UserInfoItemBox';
import Line from '../../components/common/Line';

import ModifyPhoneModal from './ModifyPhoneModal';
import ModifySalaryModal from './ModifySalaryModal';
import ModifyActivationModal from './ModifyActivationModal';

import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Utils
import {amountFormat} from '../../utils/AmountFormat';

import {shouldUseActivityState} from 'react-native-screens';
import CloseButton from '../common/CloseButton';
import {SafeAreaView} from 'react-native-safe-area-context';

// Images
const DeleteIcon = require('../../assets/images/delete_icon/delete_icon.png');
const ModifyIcon = require('../../assets/images/modify_icon/modify_icon.png');


/**
 * @title 유저 디테일 정보 스크린
 * @description
 * - route로 받아온 userID 값을 이용해 유저 정보 가져오기
 * - route로 받아온 employeeType 값을 이용해 표시되는 값들 변경
 * @returns
 */

export default class PartTimeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: {},
    };
  }

  componentDidMount() {
    this.goGetEmployeeDetail();
  }  

  goGetEmployeeDetail = () => {
    this.callGetEmployeeDetailAPI().then(response => {
      console.log('직원 상세 정보 response = ', response);
      this.setState({contents: response});
    });
  };

  //창 닫기
  goBackListener=()=> {
    this.props.navigation.goBack();
  }

  //직원상세정보 API
  async callGetEmployeeDetailAPI() {
    let manager = new WebServiceManager(Constant.serviceURL+'/GetEmployeeDetail?employee_id='+this.props.route.params.employeeID);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }


  render() {
    return (
      <>
        <View style={styles.container}>
          {/* Contents */}
          {/*빈 오브젝트 이면*/}
          {Object.keys(this.state.contents).length != 0 && (
            <FlatList
              data={null}
              style={styles.contents}
              renderItem={null}
              ListHeaderComponent={() => (
                <BaseInfo
                  item={this.state.contents}
                  refreshListener={this.goGetEmployeeDetail}
                  goBackListener={this.goBackListener}/>
              )}
              ListFooterComponent={() => (
                <AdditionalInfo 
                  pays={this.state.contents.validate!=0 ? this.state.contents.pays:[]}
                  refreshListener={this.goGetEmployeeDetail} />
              )}
            />
          )}
        </View>
      </>
    );
  }
}

//직원의 기본적인 정보 (이륻부터 활성화상태까지)
class BaseInfo extends Component {
  constructor(props) {
    super(props);

    this.tel = this.props.item.tel;

    this.state = {
      phoneModalVisible: false,
      salaryModalVisible: false,
      activateModalVisible: false,
      isActivate: false,
    };
  }

  componentDidMount() {
    if (this.props.item.validate == 1) 
      this.setState({isActivate: true});
    else 
      this.setState({isActivate: false});
  }

  //폰번호 수정시 팝업
  editPhoneModal = () => {
    this.setState({phoneModalVisible: true});
  };

  //전화번호 수정 (수정 후 상위 클래스에서 refresh)
  getPhoneNumber = phoneNumber => {
    this.setState({phoneModalVisible: false});
    this.callModifyDailyEmployeeAPI(phoneNumber,this.state.isActivate ? 1 : 0).then(response => {
      this.props.refreshListener();
      if (response.success == 0)
        Alert.alert('정보수정', '정보수정에 실패했습니다');
    });
  };

  //시급수정시 팝업
  editSalaryModal = () => {
    this.setState({salaryModalVisible: true});
  };

  //시급수정 (수정 후 상위 클래스에서 refresh)
  getSalary = (date, pay) => {
    this.setState({salaryModalVisible: false});
    this.callModifyDailyPayAPI(date, pay).then(response => {
      this.props.refreshListener();
      if (response.success <= 0) 
        Alert.alert('시급수정', response.message);
    });
  };

  //활성화 버튼 팝업
  editActivationModal = () => {
    this.setState({activateModalVisible: true});
  };

  //활성화 상태 수정 (수정 후 상위 클래스에서 refresh)
  getActivate = activate => {
    console.log('activate=', activate);
    this.setState({activateModalVisible: false, isActivate: activate});
    this.callModifyDailyEmployeeAPI(this.tel, activate ? 1 : 0).then(response => {
        this.props.refreshListener();
        if (response.success == 0)
          Alert.alert('정보수정', '정보수정에 실패했습니다');
      },
    );
  };

  //직원 삭제 클릭시 
  goRemoveDailyEmployeeAlert = () => {
    Alert.alert(
      '직원삭제',
      this.props.item.name+' 직원을 삭제할까요?',
      [
        {text: '취소', onPress: () => {}},
        {
          text: '확인',
          onPress: () => {
            this.goRemoveDailyEmployee();
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  goRemoveDailyEmployee=()=> {
    console.log('삭제 버튼 클릭 = ',this.props.item.id);
    this.callRemoveDailyEmployeeAPI().then((response)=> {
      if(response.success==1)
        this.props.goBackListener();
    });
  }

  cancelButtonListener = (value) => {
    this.setState(value);
  };

  //시급수정 API
  async callModifyDailyPayAPI(date, pay) {
    let manager = new WebServiceManager(Constant.serviceURL + '/ModifyDailyPay','post');
    const formData = {
      employeeID: this.props.item.id,
      startDate: dayjs(date).format('YYYY-MM-DD'),
      pay: parseInt(pay),
    };

    manager.addFormData('data', formData);
    let response = await manager.start();

    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  //전화번호 또는 활성화 상태 수정 API
  async callModifyDailyEmployeeAPI(tel, validate) {
    let manager = new WebServiceManager(Constant.serviceURL + '/ModifyDailyEmployee','post');
    const formData = {
      employeeID: this.props.item.id,
      tel: tel,
      validate: validate,
    };

    manager.addFormData('data', formData);
    let response = await manager.start();

    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  //직원삭제 API
  async callRemoveDailyEmployeeAPI() {
    let manager = new WebServiceManager(Constant.serviceURL+'/RemoveDailyEmployee?employee_id='+this.props.item.id);
    let response = await manager.start();

    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    const {name, cNumber, tel, startDate, pay} = this.props.item;

    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {/* Contents Header */}
        <SafeAreaView edges={['top']} style={styles.contentsHeader}>
          <View style={styles.topHeader}>
            <View style={[styles.employeeType, styles.fullTime]}>
              <Text style={styles.employeeTypeText} fontWeight={500}>
                아르바이트
              </Text>
            </View>

            <View style={styles.userName}>
              <Text style={styles.userNameText} fontWeight={600}>
                {name}
              </Text>
              <TouchableOpacity
                style={styles.modifyButton}
                onPress={() => this.goRemoveDailyEmployeeAlert()}>
                <Image source={DeleteIcon} style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.closeButton}>
              <CloseButton />
            </View>
          </View>

          <View style={styles.idCardNumber}>
            <Text style={styles.idCardNumberText}>
              {Constant.transformCNumber(cNumber)}
            </Text>
          </View>
        </SafeAreaView>

        {/* UserInfo */}
        <View style={styles.userInfo}>
          <UserInfoItemBox
            label="연락처"
            value={
              <>
                <Text style={styles.valueText} fontWeight={500}>
                  {Constant.transformPhoneNumber(tel)}
                </Text>
                {this.state.isActivate && (
                  <Pressable
                    style={styles.modifyButton}
                    onPress={() => this.editPhoneModal()}>
                    <Image source={ModifyIcon} style={styles.buttonIcon} />
                  </Pressable>
                )}
              </>
            }
          />

          <UserInfoItemBox
            label="입사일"
            value={<Text style={styles.valueText}>{startDate}</Text>}
          />

          <UserInfoItemBox
            label="시급 (단위 원)"
            value={
              <>
                <Text style={styles.valueText}>{amountFormat(pay)}</Text>
                {this.state.isActivate && (
                  <TouchableOpacity
                    style={styles.modifyButton}
                    onPress={() => this.editSalaryModal()}
                    >
                    <Image source={ModifyIcon} style={styles.buttonIcon} />
                  </TouchableOpacity>
                )}
              </>
            }
          />

          <UserInfoItemBox
            label="활성화 상태"
            value={
              <ToggleButton
                active={this.state.isActivate}
                onPress={() => this.editActivationModal()}
              />
            }
          />
        </View>
        {/* 연락처/ 연봉또는 시급/ 활성화 상태 변경하는 모달 */}
        {/* 모달 뜨는 위치 확인 바람 */}
        {this.state.phoneModalVisible && (
          <ModifyPhoneModal
            data={tel}
            okButtonListener={this.getPhoneNumber}
            cancelButtonListener={() =>
              this.cancelButtonListener({phoneModalVisible: false})
            }
          />
        )}
        {this.state.salaryModalVisible && (
          <ModifySalaryModal
            data={pay}
            title="시급"
            okButtonListener={(date, pay) => this.getSalary(date, pay)}
            cancelButtonListener={() =>
              this.cancelButtonListener({salaryModalVisible: false})
            }
          />
        )}
        {this.state.activateModalVisible && (
          <ModifyActivationModal
            isActivate={this.state.isActivate}
            name={this.props.item.name}
            okButtonListener={this.getActivate}
            cancelButtonListener={() =>
              this.cancelButtonListener({activateModalVisible: false})
            }
          />
        )}
      </>
    );
  }
}

//시급 변경 내역 리스트
class AdditionalInfo extends Component {
  constructor(props) {
    super(props);
  }

  goRemoveDailyPayAlert = (item) => {
    Alert.alert(
      '시급삭제',
      item.startDate+`부터 적용되는 시급 ${amountFormat(item.pay)}원을 삭제할까요?`,
      [
        {text: '취소', onPress: () => {}},
        {
          text: '확인',
          onPress: () => {
            this.removeDailyPay(item.id);
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  removeDailyPay=(id)=> {  
    console.log('삭제 합니다. = ',id);  
    this.callRemoveDailyPayAPI(id).then((response)=> {
      console.log("시급 삭제 response = ",response);
      if(response.success==1)
        this.props.refreshListener();
    });
  }

  async callRemoveDailyPayAPI(id) {
    let manager = new WebServiceManager(Constant.serviceURL + '/RemoveDailyPay?id='+id);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    return (
      <View style={styles.salaryDetails}>
        <View style={styles.detailsTitle}>
          <Text style={styles.detailsTitleText} fontWeight={600}>
            시급 변경 내역
          </Text>
        </View>

        <FlatList
          data={this.props.pays}
          style={{
            borderBottomColor: THEME.COLOR.LIGHT_GRAY,
            borderBottomWidth: 1,
          }}
          renderItem={({item}) => this.renderItem(item)}
          nestedScrollEnabled
          ItemSeparatorComponent={Line}
        />
      </View>
    );
  }

  renderItem = (item) => {
    const endDate = item.endDate == '2100-12-31' ? '' : item.endDate;
    return (
      <View style={[styles.detailItem]}>
        <View>
          <View style={styles.detailItemHeader}>
            <Text style={[styles.detailItemHeaderText]} fontWeight={500}>
              {item.startDate} ~ {endDate}
            </Text>
          </View>

          <View style={styles.detailAmount}>
            <Text style={[styles.amountText]} fontWeight={600}>
              {amountFormat(item.pay)}
            </Text>
            <Text style={[styles.unitText]}>원</Text>
          </View>
        </View>
        
        {item.erasable==1 && (
            <TouchableOpacity
              style={styles.modifyButton}
              onPress={() => this.goRemoveDailyPayAlert(item)}
              >
              <Image source={DeleteIcon} style={styles.buttonIcon} />
            </TouchableOpacity>
          )}
      </View>
    );
  };
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  contents: {},
  contentsHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 25,
  },
  topHeader: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  employeeType: {
    width: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginBottom: 16,
  },
  employeeTypeText: {
    fontSize: 13,
    fontWeight: '500',
    color: THEME.COLOR.WHITE_COLOR,
  },
  fullTime: {
    backgroundColor: THEME.COLOR.BLUE_COLOR,
  },
  partTime: {
    backgroundColor: THEME.COLOR.VIOLET_COLOR,
  },
  userName: {
    width: '100%',
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userNameText: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  idCardNumber: {},
  idCardNumberText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    color: THEME.COLOR.GRAY_COLOR,
  },
  userInfo: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderTopColor: THEME.COLOR.LIGHT_GRAY,
    borderTopWidth: 1,
    borderBottomColor: THEME.COLOR.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  valueText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
  },
  salaryDetails: {paddingTop: 30, paddingBottom: 20},
  detailsTitle: {
    paddingHorizontal: 25,
    paddingBottom: 8,
    borderBottomColor: THEME.COLOR.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  detailsTitleText: {
    fontSize: 17,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  detailItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailItemHeaderText: {
    fontSize: 15,
    fontWeight: '400',
    color: THEME.COLOR.SUB_COLOR,
    marginBottom: 3,
  },
  modifyButton: {
    //borderWidth: 1,
    //marginLeft: 10,
    padding: 4
  },
  buttonIcon: {
    width: 16,
    height: 16,
  },
  detailAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: '600',
    color: THEME.COLOR.BLACK_COLOR,
  },
  unitText: {
    fontSize: 15,
    fontWeight: '400',
    color: THEME.COLOR.BLACK_COLOR,
    marginLeft: 2,
  },
  line: {},
  disabledDetailItem: {
    backgroundColor: THEME.COLOR.GHOST_WHITE,
  },
  disabledText: {
    color: THEME.COLOR.GRAY_COLOR,
  },
});
