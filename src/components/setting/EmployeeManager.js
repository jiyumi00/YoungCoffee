import {extend} from 'dayjs';
import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {THEME} from '../../constants/theme';
// Components
import EmployeeHeader from './EmployeeHeader';
import FullTimeList from './FullTimeList';
import PartTimeList from './PartTimeList.';

export default class EmployeeManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeKind: 'partTime',
    };
  }

  changeEmployeeKind = kind => {
    //console.log('employee kind=', kind);
    this.setState({employeeKind: kind});
  };

  addEmployee = () => {
    //console.log('add Employee');
    this.props.navigation.navigate('AddEmployee');
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Header 정직원/아르바이트/직원등록 선택 화면*/}
        <EmployeeHeader
          navigation={this.props.navigation}
          changeEmployeeKindListener={kind => this.changeEmployeeKind(kind)}
          addEmployeeListener={() => this.addEmployee()}
        />
        {this.state.employeeKind == 'partTime' && (
          <PartTimeList navigation={this.props.navigation} />
        )}
        {this.state.employeeKind == 'fullTime' && (
          <FullTimeList navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    
  },
});
