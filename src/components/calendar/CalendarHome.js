import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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
                        <Calendar navigation={this.props.navigation}/>
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
        backgroundColor:'white'
    },
    contentContainer: { flexGrow: 1 },
    header: {
        backgroundColor: THEME.COLOR.WHITE_COLOR,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:10,
    },
});
