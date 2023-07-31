import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import SettingHeader from '../../components/setting/SettingHeader';
import Text from '../../components/common/Text';

const TEST_DATA = [
    {
        id: 1,
        createdAt: 1677628800000,
        title: '4월 정산 월말 마감 기간',
        content: '4월 정산 월말 마감 기간입니다. 월말 마감 신청을 해주세요.',
        isRead: false,
    },
    {
        id: 2,
        createdAt: 1677628800000,
        title: '3월 정산 월말 마감 기간',
        content: '3월 정산 월말 마감 기간입니다. 월말 마감 신청을 해주세요.',
        isRead: true,
    },
    {
        id: 3,
        createdAt: 1677628800000,
        title: '2월 정산 월말 마감 기간',
        content: '2월 정산 월말 마감 기간입니다. 월말 마감 신청을 해주세요.',
        isRead: true,
    },
];

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    contentContainer: {
        flexGrow: 1,
    },
    item: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderTopColor: THEME.COLOR.LIGHT_GRAY,
        borderTopWidth: 1,
        borderBottomColor: THEME.COLOR.LIGHT_GRAY,
        borderBottomWidth: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    isReadItem: {
        backgroundColor: THEME.COLOR.GHOST_WHITE,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    topContents: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        fontWeight: '300',
        color: THEME.COLOR.GRAY_COLOR,
    },
    readText: {
        fontSize: 13,
        fontWeight: '400',
        color: THEME.COLOR.SILVER,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
        marginBottom: 4,
    },
    isReadTitle: {
        color: THEME.COLOR.GRAY_COLOR,
    },
    content: {
        fontSize: 13,
        fontWeight: '300',
        color: THEME.COLOR.GRAY_COLOR,
    },
    separator: {
        height: 6,
    },
});

export default class NotificationManager extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View style={styles.container}>
            <Insets>
                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={TEST_DATA}
                    renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={this.props.navigation}/>}
                    ListHeaderComponent={<SettingHeader title='알림 관리' />}
                    ItemSeparatorComponent={()=> <View style={styles.separator} />}
                />
            </Insets>
        </View>
        )
    }
}

class RenderItem extends Component{

    constructor(props){
        super(props);
        this.item=this.props.item;
       
    }
    render(){
        const date = dayjs(this.item.createdAt).format('YYYY. MM. DD HH:mm');
        return(
            <View style={[styles.item, this.item.isRead ? styles.isReadItem : null]}>
            <View style={styles.topContents}>
                <Text style={styles.date}>{date}</Text>
                {this.item.isRead && (
                    <Text style={styles.readText}>확인 완료</Text>
                )}
            </View>

            <Text
                style={[
                    styles.title,
                    this.item.isRead ? styles.isReadTitle : null,
                ]}>
                {this.item.title}
            </Text>
            <Text style={styles.content}>{this.item.content}</Text>
        </View>
        )
    }
}
