import { StyleSheet, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { Component } from 'react';
import { SHADOW, THEME } from '../../constants/theme';
import ModalContainer from '../../components/modal/ModalContainer';
import Text from '../../components/common/Text';

const styles = StyleSheet.create({
    contents: {
        width: '100%',
        backgroundColor: THEME.COLOR.WHITE_COLOR,
        padding: 10,
    },
    list: {
        paddingBottom: 0,
    },
    listItem: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
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
        fontWeight: '700',
        color: THEME.COLOR.MAIN_COLOR,
    },
});

export default class SelectViewTypeModal extends Component {
    constructor(props) {
        super(props);
        this.modalButtons = [
            {
                id:1,
                label: '취      소',
                onPress: this.cancelButtonClicked,
            },
            /*
            {
                id:2,
                label: '확인',
                onPress: () => {
                    // TODO 변경 로직 작성    
                    this.okButtonClicked();
                },
            }*/
        ];
    }    

    cancelButtonClicked=()=>{
        console.log('cancel clicked...');
        //this.props.navigation.goBack();
        this.props.cancelButtonClicked();
    }

    okButtonClicked=(item)=> {
        console.log('ok clicked....',item);
        //this.props.navigation.goBack();
        this.props.okButtonClicked(item);
        
    }

    
    render() {
        return (
            <Modal transparent>
                <ModalContainer onClose={()=>this.cancelButtonClicked()} buttons={this.modalButtons}>
                    <View style={styles.contents}>
                        {/* List */}
                        <FlatList
                            data={['일', '주', '월']}
                            renderItem={({item,index }) => this.renderItem(item,index)}
                            contentContainerStyle={styles.list}
                            ItemSeparatorComponent={<View style={styles.separator}/>}
                        />
                    </View>
                </ModalContainer>
            </Modal>
        );
    }

    renderItem=(item, index)=> {
        console.log('item data',item);
        return (
            <TouchableOpacity
                onPress={()=>this.okButtonClicked(item)}
                activeOpacity={0.7}
                style={styles.listItem}>
                <Text style={styles.listItemText} key={index}>{item}</Text>
            </TouchableOpacity>
        );
    }
}