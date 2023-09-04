import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import Insets from '../common/Insets';
import Logo from '../common/Logo';
import Calendar from './Calendar';

// constants
import {THEME} from '../../constants/theme';

export default class CalendarHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
        <Insets>
         
            {/* Header */}
            <View style={styles.header}>
              {/* Logo */}
              <Logo />
            </View>

            {/* Calendar */}
            <Calendar navigation={this.props.navigation} />
       
        </Insets>
      </SafeAreaView>
    );
  }

}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  contentContainer: {flexGrow: 1},
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
