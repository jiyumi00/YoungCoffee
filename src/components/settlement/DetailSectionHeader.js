import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Text from '../common/Text';

//Utils
import { amountFormat } from '../../utils/AmountFormat';


//시간 리스트와 주휴수당 리스트의 헤더(각 부분 총액 보여주기)
export default class DetailsSectionHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.detailsHeader}>
                <Text style={styles.detailsHeaderText}>{this.props.title}</Text> 
                <Text style={[styles.detailsHeaderText,{marginRight:26}]}>{amountFormat(this.props.payTotal)}원</Text>
            </View>

        );
    }
}


// Styles
const styles = StyleSheet.create({
    detailsHeader: {
        paddingVertical: 8,
        paddingHorizontal: 25,
        marginTop: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    detailsHeaderText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: THEME.COLOR.GRAY_COLOR,
    },
});
