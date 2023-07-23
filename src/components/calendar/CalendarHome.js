import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, BackHandler,Alert } from 'react-native';

// Components
import Insets from '../common/Insets';
import Logo from '../common/Logo';
import Calendar from './Calendar';

// constants
import { THEME } from '../../constants/theme';


export default class CalendarHome extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    }
    //이벤트 삭제
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
    }
    backPressed = () => {
        Alert.alert("", "앱을 종료하시겠습니까?", [
            {
                text: "취소",
                onPress: () => null,
                style: "cancel"
            },
            { text: "확인", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }
    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            {/* Logo */}
                            <Logo />
                        </View>

                        {/* Calendar */}
                        <Calendar navigation={this.props.navigation} />
                    </ScrollView>
                </Insets>
            </View>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    contentContainer: { flexGrow: 1 },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
