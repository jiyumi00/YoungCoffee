import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer from '../../components/modal/ModalContainer';
import InputBox from '../../components/common/InputBox';
import Input from '../../components/common/Input';
import DateButton from '../../components/common/DateButton';
import Text from '../../components/common/Text';

// Constants
import {THEME} from '../../constants/theme';
import {onUpdateNumbersOnly} from '../../utils/keyboard';



/**
 * @title 직원 활성화/비활성화 팝업

 * @returns
 */

export default class ModifyActivationModal extends Component {
  constructor(props) {
    super(props);

    this.modalButtons = [
      {
        id: 1,
        label: '취소',
        onPress: this.cancelButtonClicked,
      },
      {
        id: 2,
        label: '변경',
        onPress: () => {
          this.okButtonClicked();
        },
      },
    ];

    this.state = {
      isActivate: this.props.isActivate,
    };
  }

  cancelButtonClicked = () => {
    //console.log('cancel button clicked...');
    this.props.cancelButtonListener();
  };

  okButtonClicked = () => {
    //console.log('ok button clicked...');
    this.setState({isActivate: !this.state.isActivate}, () => {
      this.props.okButtonListener(this.state.isActivate);
    });
  };

  render() {
    return (
      <ModalContainer
        onClose={() => this.cancelButtonClicked()}
        buttons={this.modalButtons}>
        <View style={styles.contents}>
          <View style={styles.messageBox}>
            <Text style={styles.messageText} fontWeight={500}>
              {this.props.name} 직원의 상태를
            </Text>
            <Text style={styles.messageText} fontWeight={500}>
              {this.props.isActivate ? (
                <Text style={styles.messagePointText} fontWeight={600}>
                  비활성화
                </Text>
              ) : (
                <Text style={styles.messagePointText} fontWeight={600}>
                  활성화
                </Text>
              )}
              하시겠습니까?
            </Text>
          </View>
        </View>
      </ModalContainer>
    );
  }
}




// Styles
const styles = StyleSheet.create({
  contents: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  header: {
    marginBottom: 6,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: THEME.COLOR.VIOLET_COLOR,
  },
  messageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  messageText: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
  },
  messagePointText: {
    fontSize: 17,
    fontWeight: '600',
    color: THEME.COLOR.VIOLET_COLOR,
  },
});
