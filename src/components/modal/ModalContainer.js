import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable,Modal } from 'react-native';

// Constants
import { SHADOW, THEME } from '../../constants/theme';

// Components
import Text from '../common/Text';


export default class ModalContainer extends Component {

    constructor(props) {
        super(props);

        this.buttons = this.props.buttons;
    }

    render() {
        return (         
                <Modal transparent={true}>
                    <View style={styles.container}>
                        <TouchableOpacity style={{flex:2}} onPress={this.props.onClose}/>
                        <View style={styles.contents}>
                            {/* Children */}
                            {this.props.children}
            
                            {/* Button List */}
                            <View style={styles.buttons}>
                                {this.buttons?.map(button => (
                                    <TouchableOpacity
                                        key={button.id}
                                        activeOpacity={0.8}
                                        style={[styles.button, button.buttonStyle]}
                                        onPress={button.onPress}>
                                        <Text style={[styles.buttonText,button.buttonTextStyle]}>
                                            {button.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>                        
                        </View>
                    </View>
                </Modal>       
        );
    }
}


// Styles
const styles = StyleSheet.create({

    container:{
       width: '100%',
       height: '100%',
       backgroundColor:'rgba(52, 52, 52, 0.5)',
    },
    contents: {  
        width: '100%',
        //height:'100%',
        backgroundColor: THEME.COLOR.WHITE_COLOR,
        padding: 10,
        //...SHADOW,
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
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
    },
});