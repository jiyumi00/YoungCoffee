import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Text from '../common/Text';

// Utils
import {dateMonthFormat} from '../../utils/DateFormat';

export default class CustomHeader extends Component {
  constructor(props) {
    super(props);
  }

  //constructor는 한번만 수행되기 때문에
  render() {
    return (
      <View style={[styles.row]}>
        <Text style={[styles.dateText]} fontWeight={700}>
          {dateMonthFormat(this.props.date)}
        </Text>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 21,
    lineHeight: 24,
    color: THEME.COLOR.MAIN_COLOR,
  },
});
