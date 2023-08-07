import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {THEME} from '../../constants/theme';
import Text from '../common/Text';

const styles = StyleSheet.create({
  infoItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '400',
    color: THEME.COLOR.SUB_COLOR,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default class UserInfoItemBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {label, value} = this.props;
    return (
      <View style={styles.infoItemBox}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={styles.value}>{value}</View>
      </View>
    );
  }
}
