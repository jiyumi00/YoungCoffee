import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Text from '../common/Text';

// Utils
import { dateMonthFormat } from '../../utils/DateFormat';


export default class CustomHeader extends Component {
    constructor(props) {
        super(props);
        /* this.state = {
            date: this.props.date
        } */
    }
   //constructor는 한번만 수행되기 때문에
    render() {
        console.log('date',this.props.date) 
       
        return (
            <View style={[styles.row]}>
                <Text style={[styles.dateText]}>{dateMonthFormat(this.props.date)}</Text>
            </View>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: THEME.COLOR.MAIN_COLOR,
    },
    selectIcon: {
        marginLeft: 10,
    },
    todayIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: THEME.COLOR.SUB_COLOR,
        opacity: 0.2,
        marginRight: 5,
    },
    todayText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: THEME.COLOR.MAIN_COLOR,
    },
});