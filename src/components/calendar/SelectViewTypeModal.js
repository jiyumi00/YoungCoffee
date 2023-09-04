import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import React, {Component} from 'react';
import {THEME} from '../../constants/theme';
import ModalContainer from '../../components/modal/ModalContainer';
import Text from '../../components/common/Text';


export default class SelectViewTypeModal extends Component {
  constructor(props) {
    super(props);
    this.modalButtons = [
      {
        id: 1,
        label: '취    소',
        onPress: this.cancelButtonClicked,
      }
    ];
  }

  cancelButtonClicked = () => {
    //console.log('cancel clicked...');
    //this.props.navigation.goBack();
    this.props.cancelButtonClicked();
  };

  okButtonClicked = item => {
    //console.log('ok clicked....', item);
    //this.props.navigation.goBack();
    this.props.okButtonClicked(item);
  };

  render() {
    return (
      <ModalContainer
        onClose={() => this.cancelButtonClicked()}
        buttons={this.modalButtons}>
        <View style={styles.contents}>
          {/* List */}
          <FlatList
            data={['일', '주', '월']}
            renderItem={({item, index}) => this.renderItem(item, index)}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={<View style={styles.separator} />}
          />
        </View>
      </ModalContainer>
    );
  }

  renderItem = (item, index) => {
    //console.log('item data', item);
    return (
      <TouchableOpacity
        onPress={() => this.okButtonClicked(item)}
        activeOpacity={0.7}
        style={styles.listItem}>
        <Text style={styles.listItemText} key={index}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
}


const styles = StyleSheet.create({
  contents: {
    width: '100%',
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    paddingVertical: 10,
  },
  list: {},
  listItem: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
  separator: {
    width: '80%',
    height: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
  },
  selectListItem: {
    color: THEME.COLOR.VIOLET_COLOR,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
  },
});
