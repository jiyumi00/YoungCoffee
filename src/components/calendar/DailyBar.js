import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { Component } from 'react';
import { THEME } from '../../constants/theme';


//근무한 시간량을 Bar형태로 보여주기
export default class DailyBar extends Component {
    constructor(props) {
        super(props);
        console.log('progress in bar =', this.props.data);
    }
    

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}        //가급적 주도록 하자
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }} />
            </View>
        );
    }

    renderItem = (item, index) => {
        const hourly = parseInt(item.amount/60);
        const minute = item.amount%60;
        const block = parseInt(item.amount / 600 * 100); //전체 100%중에 몇퍼센트 채울지에 대한 숫자
        const blockSize = block.toString().concat('%');

        return (
            <>
                <Text>{item.start} ~ {item.end}</Text>
                <View style={[styles.boxes]}>
                    <View style={[styles.boxes.width = blockSize, styles.boxes.backgroundColor = barColor[index]]}>
                        {minute!=0 ? (
                            <Text style={styles.boxesText}>{hourly}시간 {minute}분</Text>
                        ):(
                            <Text style={styles.boxesText}>{hourly}시간</Text>
                        )}
                        
                    </View>
                </View>
            </>
        );
    }

}


const barColor = ['#18ABA1', '#E868A0', '#295CC5']

// Styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    boxes: {
        width: '100%',
        height:25,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'blue',
        marginBottom: 5,
        flexShrink: 1
    },
    box: {
        width: '100%',
        backgroundColor: 'pink',
        
        flex: 1,
    },
    line: {
        width: 1,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
    },
    boxesText:{
        color:THEME.COLOR.WHITE_COLOR,
    }
});