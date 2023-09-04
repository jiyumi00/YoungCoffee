import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Text from '../common/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import {keyboardBehavior} from '../../utils/keyboard';

export default class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.buttons = this.props.buttons;
  }

  render() {
    return (
      <Modal transparent={true} >
        <View style={[styles.safeArea, StyleSheet.absoluteFill]}>
          {/* Background */}
          <Pressable
            style={[StyleSheet.absoluteFill, styles.background]}
            onPress={this.props.onClose}
          />
          
          <SafeAreaView
            edges={[this.props.bottomInset && 'bottom']}
            mode="padding"
            style={styles.container}>
              
            <View style={styles.contents}>
              {/* Children */}
              {this.props.children}
            </View>
            <TouchableOpacity style={{}} onPress={this.props.onClose} />

            {/* Button List */}
            <View style={[styles.buttons]}>
              {this.buttons?.map(button => (
                <TouchableOpacity
                  key={button.id}
                  activeOpacity={0.8}
                  style={[styles.button, button.buttonStyle]}
                  onPress={button.onPress}>
                  <Text
                    style={[styles.buttonText, button.buttonTextStyle]}
                    fontWeight={600}>
                    {button.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
          
          {/* </ScrollView> */}
        </View>
      </Modal>

    );
  }
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    flex:1,
    justifyContent: 'flex-end',
    //borderWidth:20,
    //flexBasis:0,
  },
  container: {
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    
    
    
  },
  background: {
    
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    //backgroundColor: 'red',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  contents: {
    width: '100%',
    //...SHADOW,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
  },
});
