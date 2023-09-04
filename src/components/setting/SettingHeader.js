import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// Components
import CloseButton from '../common/CloseButton';
import Text from '../common/Text';

// Constants
import {THEME} from '../../constants/theme';

export default class SettingHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title;

    return (
      <View style={styles.header}>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText} fontWeight={700}>
            {title}
          </Text>
        </View>

        <CloseButton style={styles.closeBtnPosition} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  screenTitle: {flexDirection: 'row'},
  screenTitleText: {
    fontSize: 19,
    color: THEME.COLOR.MAIN_COLOR,
  },
});
