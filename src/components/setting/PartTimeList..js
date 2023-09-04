import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Pressable} from 'react-native';

import Image from '../common/Image';
// Constants
import {THEME} from '../../constants/theme';
import Text from '../common/Text';

//Component
import WebServiceManager from '../../utils/webservice_manager';
import Constant from '../../utils/constants';

// Utils
import {amountFormat} from '../../utils/AmountFormat';

// Images
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');

export default class PartTimeList extends Component {
  constructor(props) {
    super(props);
    this.userID = '';

    this.state = {
      contents: [],
    };
  }

  componentDidMount() {  
    //본 화면이 포커스를 얻을 때 실행됨 (여기에서 부른 modal창이 닫히면 본 화면이 로딩됨으로 API새로 호출함)
    this.props.navigation.addListener('focus',()=> {
        this.getDailyEmployees();
    });
  }

  //직원 상세보기
  goEmployeeDetail = (item) => {
    this.props.navigation.navigate('PartTimeDetail', {employeeID: item.id});
  };

  getDailyEmployees = () => {
    Constant.getUserInfo().then((response)=> {
      this.userID = response.userID;
      this.callGetDailyEmployeesAPI().then(response => {
        //console.log('직원 리스트 = ',response);
        this.setState({contents: response});
      });
    });
  };

  async callGetDailyEmployeesAPI() {
    console.log('userID = ', this.userID);
    let manager = new WebServiceManager(Constant.serviceURL + '/GetDailyEmployees?user_id=' + this.userID);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={this.state.contents}
        refreshing={false}
        onRefresh={this.getDailyEmployees}
        renderItem={({item}) => this.renderItem(item)}
        ItemSeparatorComponent={<View style={styles.separator} />}
        ListFooterComponent={<View style={styles.separator} />}
      />
    );
  }

  renderItem = (item) => {
    //활성화된 직원일 경우 진하게 표시
    return (
      <Pressable
        style={[styles.employee]}
        onPress={() => this.goEmployeeDetail(item)}>
        {/* Left Contents - 이름 */}
        <View style={styles.employeeName}>
          <Text
            style={[
              styles.employeeNameText, styles.deactivationText,
              item.validate === 1 && {color: 'black'},
            ]}
            fontWeight={500}>
            {item.name}
          </Text>
          <Image source={LinkIcon} style={styles.linkIcon} />
        </View>
      
        <View style={styles.employeeInfo}>
          <View style={styles.createdAt}>
            <Text
              style={[
                styles.employeeInfoText,
                item.validate === 1 && styles.activeEmployeeInfoText,
              ]}>
              {item.startDate}
            </Text>
          </View>
          <View style={[styles.line]} />
          
          <View style={[styles.annualIncome]}>
            <Text
              style={[
                styles.employeeInfoText,
                item.validate === 1 && styles.activeEmployeeInfoText,
                {
                  textAlign: 'right',
                },
              ]}>
              {amountFormat(item.pay)}원
            </Text>
          </View>
        </View>
       
      </Pressable>
    );
  };
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  contents: {
    flex: 1,
  },
  employee: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  employeeName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  employeeNameText: {
    fontSize: 17,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
  deactivationText: {
    color: THEME.COLOR.SILVER,
  },
  linkIcon: {
    width: 10,
    height: 10,
    marginLeft: 10,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employeeInfoText: {
    fontSize: 15,
    fontWeight: '400',
    color: THEME.COLOR.SILVER,
  },
  activeEmployeeInfoText: {
    color: THEME.COLOR.GRAY_COLOR,
  },
  createdAt: {},
  line: {
    width: 1,
    height: 16,
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
    marginLeft: 12,
    marginRight: 6,
  },
  annualIncome: {width: 60, alignSelf: 'flex-end'},
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
  },
});
