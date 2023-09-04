import React, {Component} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Images
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';

// Constants
import {THEME} from '../../constants/theme';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Images
const TimeIcon = require('../../assets/images/time_icon/time_icon.png');

/* 해당점에서 근무하는 아르바이트 직원에 대한 근무일지 작성  */
export default class QuickAddWorkingTime extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.userID = '';

    this.state = {
      contents: [],
    };
  }

  componentDidMount() {
    Constant.getUserInfo().then(response => {
      this.userID = response.userID;
      this.callGetDailyEmployeesAPI().then(response => {
        this.setState({contents: this.filteredContents(response)});
      });
    });
  }

  //활성화되어 있는 아르바이트 직원만 filter
  filteredContents = data => {
    let list = data;
    list = list.filter(content => {
      if (content.validate == 1 && content.pay!=0) 
        return true;
    });
    return list;
  };

  async callGetDailyEmployeesAPI() {
    //console.log('userID = ', this.userID);
    let manager = new WebServiceManager(Constant.serviceURL + '/GetDailyEmployees?user_id=' + this.userID);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 투명 배경 */}
        <Pressable style={styles.background} onPress={this.navigation.goBack} />

        {/* 아르바이트 유저 목록 */}
        <View style={styles.contents}>
          <FlatList
            style={styles.list}
            data={this.state.contents}
            renderItem={({item, index}) => (
              <ListItem
                index={index}
                item={item}
                navigation={this.navigation}
              />
            )}
            ListHeaderComponent={() => this.flatListHeader()}
            stickyHeaderIndices={[0]}
          />
          <View style={styles.triangle} />
        </View>
      </View>
    );
  }

  flatListHeader() {
    return (
      <View style={styles.listHeader}>
        <Image style={styles.listHeaderIcon} source={TimeIcon} />
        <Text style={styles.listHeaderText} fontWeight={600}>
          빠른 등록
        </Text>
      </View>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  onItemClicked = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate('AddWorkingTimeModal', {data: this.item});
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          this.onItemClicked();
        }}>
        <Text style={styles.listItemText} fontWeight={500}>
          {this.item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#000d2915',
  },
  contents: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 85,
    right: 20,
  },
  listHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: THEME.COLOR.LIGHT_GRAY,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 15,
    marginBottom: 10,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  listHeaderIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  listHeaderText: {
    fontSize: 15,
    lineHeight: 18,
    color: THEME.COLOR.SUB_COLOR,
  },
  list: {
    bottom: 0,
    minHeight: 170,
    maxHeight: 350,
    width: 130,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 12,
    shadowColor: '#00247252',
  },
  triangle: {
    position: 'absolute',
    bottom: -25,
    right: 20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: THEME.COLOR.WHITE_COLOR,
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
  },
});
