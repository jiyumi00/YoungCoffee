import { StyleSheet, View, SectionList, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

// Constants
import { THEME } from '../../constants/theme';
import { settlementState } from '../../constants/settlement';

// Components
import Insets from '../../components/common/Insets';
import CloseButton from '../../components/common/CloseButton';
import DetailSectionHeader from '../../components/settlement/DetailSectionHeader';
import DetailHistoryItem from '../../components/settlement/DetailHistoryItem';
import Text from '../../components/common/Text';

// utils
import { monthFormat } from '../../utils/DateFormat';

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    screenTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    screenTitleText: {
        fontSize: 20,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
    },
    screenTitlePointText: {
        fontSize: 20,
        fontWeight: '600',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    screenStateText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
    },

    listSeparator: {
        height: 6,
    },
    listFooter: {
        height: 40,
    },
    deadlineButton: {
        height: 60,
        backgroundColor: THEME.COLOR.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deadlineButtonText: {
        fontSize: 18,
        color: THEME.COLOR.WHITE_COLOR,
    },
    history: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    historyTitle: {
        flex: 1,
    },
    historyTitleText: {},
    historyAmount: {},
    historyAmountText: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
    },
    historySetting: {
        width: 26,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});


/**
 * @title 정산 디테일 스크린
 * @description
 * - params로 받아온 값을 이용해 해당 월의 정산 내역 확인 (API 요청)
 * - 직원의 타입에 따라 구분하여 정보 확인 (SectionList 사용)
 * - 각 직원마다의 정산 히스토리를 토글로 확인 가능
 * - 상태가 마감전(1)일 경우에만 부분 수정이 가능
 * - 상여금, 급여, 보너스일 경우에만 값 변경 가능
 * - 상여금, 보너스일 경우에는 이전 금액을 확인하고 이후 변경할 금액을 입력하는 모달로 값 업데이트
 * - 아르바트의 급여를 변경할 경우에는 출근/퇴근 시간, 급여를 입력
 * - DatePicker에서 보여지는 값과 적용되는 값은 다른 State로 관리되고 있음 (확인을 누르면 적용되는 값에 보여지는 값 업데이트)
 * @returns
 */

export default class DetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            employeeData:[
                {
                    employeeType: '정직원',
                    data: [
                        {
                            name: '김가가',
                            totalAmount: 2500000,
                            history: [
                                {
                                    id: 123,
                                    amount: 2400000,
                                    possible: false,
                                    type: 1,
                                },
                                {
                                    id: 124,
                                    amount: 100000,
                                    possible: true,
                                    type: 2,
                                },
                            ],
                            active: false,
                        },
                        {
                            name: '이나나',
                            totalAmount: 2200000,
                            history: [],
                            active: false,
                        },
                    ],
                },
                {
                    employeeType: '아르바이트',
                    data: [
                        {
                            name: '박바바',
                            totalAmount: 2000000,
                            history: [
                                {
                                    id: 125,
                                    amount: 57720,
                                    possible: true,
                                    type: 3,
                                    startTime: 1686552730960,
                                    endTime: 1686552730960,
                                    totalTime: 6,
                                },
                                {
                                    id: 126,
                                    amount: 57720,
                                    possible: true,
                                    type: 3,
                                    startTime: 1686552730960,
                                    endTime: 1686552730960,
                                    totalTime: 6,
                                },
                                {
                                    id: 127,
                                    amount: 57720,
                                    possible: true,
                                    type: 3,
                                    startTime: 1686552730960,
                                    endTime: 1686552730960,
                                    totalTime: 6,
                                },
                            ],
                            active: false,
                        },
                        {
                            name: '김사사',
                            totalAmount: 1800000,
                            history: [],
                            active: false,
                        },
                        {
                            name: '이아아',
                            totalAmount: 2500000,
                            history: [],
                            active: false,
                        },
                    ],
                },
            ],
            selectedData:null,
        }

    }
    onOpenModal = () => {
        if (!this.state.selectedData) return;
        switch (this.state.selectedData.employeeType) {
            case '정직원':
                this.props.navigation.navigate('BonusModify', { data: this.state.selectedData });
                break;

            case '아르바이트':
                this.props.navigation.navigate('PayrollModal', { data: this.state.selectedData });
                break;
        }
    };
    render(){
        const { year, month, state } = this.props.route.params.state;
        return(
            <View style={styles.container}>
            <Insets>
                {/* Header */}
                <View style={styles.header}>
                    {/* Title */}
                    <View style={styles.screenTitle}>
                        <Text style={styles.screenTitleText}>{year}년 </Text>
                        <Text style={styles.screenTitlePointText}>{monthFormat(month)}월{' '}</Text>
                        <Text style={styles.screenTitleText}>내역</Text>
                        <Text style={[styles.screenStateText,{ color: settlementState[state].color }]}>
                            ({settlementState[state].label})
                        </Text>
                    </View>

                    {/* Close Button */}
                    <CloseButton />
                </View>

                {/* List */}
                <SectionList
                    sections={this.state.employeeData}
                    keyExtractor={(item, index) => item.name + index}
                    renderSectionHeader={()=><DetailSectionHeader/>}
                    renderItem={({ item, index, section }) => {
                        const onToggleHistory = () => {
                            // 해당 Item의 Section Index
                            const sectionIndex = 
                            this.state.employeeData.findIndex( value => value.employeeType === section.employeeType);

                            // Employee State update
                            this.setState(prevState => {
                                const updateData = [...prevState.employeeData];
                                updateData[sectionIndex].data[index].active = !updateData[sectionIndex].data[index].active;
                                return { employeeData: updateData };
                                });
                        };

                        const onModifySelectedItem = historyItem => {
                            this.setState({selectedData:{
                                ...historyItem,
                                employeeType: section.employeeType,
                                name: item.name,
                                month,
                            }})
                            this.onOpenModal();
                        };

                        return (
                            <DetailHistoryItem
                                item={item}
                                onToggle={onToggleHistory}
                                onModifySelectedItem={onModifySelectedItem}
                                detailState={state} />
                        );
                    }}
                    ItemSeparatorComponent={()=>(<View style={styles.listSeparator} />)}
                    renderSectionFooter={() =>(<View style={styles.listFooter} /> )}
                    stickySectionHeadersEnabled />

                {/* 마감 신청 버튼 - state가 1(마감전)일 경우 */}
                {state === 1 && (
                    <TouchableOpacity style={styles.deadlineButton} activeOpacity={0.8}>
                        <Text style={styles.deadlineButtonText}>마감 신청</Text>
                    </TouchableOpacity>
                )}
            </Insets>
        </View>
        );
    }
}
// function DetailsScreen({ route, navigation }) {
   

//     // API 요청을 통해 받아온 DATA
//     const [employeeData, setEmployeeData] = useState();
//     const [selectedData, setSelectedData] = useState(null);

//     const onOpenModal = () => {
//         if (!selectedData) return;
//         switch (selectedData.employeeType) {
//             case '정직원':
//                 navigation.navigate('BonusModify', { data: selectedData });
//                 break;

//             case '아르바이트':
//                 navigation.navigate('PayrollModal', { data: selectedData });
//                 break;

//             default:
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Insets>
//                 {/* Header */}
//                 <View style={styles.header}>
//                     {/* Title */}
//                     <View style={styles.screenTitle}>
//                         <Text style={styles.screenTitleText}>{year}년 </Text>
//                         <Text style={styles.screenTitlePointText}>
//                             {monthFormat(month)}월{' '}
//                         </Text>
//                         <Text style={styles.screenTitleText}>내역</Text>
//                         <Text
//                             style={[
//                                 styles.screenStateText,
//                                 {
//                                     color: settlementState[state].color,
//                                 },
//                             ]}>
//                             ({settlementState[state].label})
//                         </Text>
//                     </View>

//                     {/* Close Button */}
//                     <CloseButton />
//                 </View>

//                 {/* List */}
//                 <SectionList
//                     sections={employeeData}
//                     keyExtractor={(item, index) => item.name + index}
//                     renderSectionHeader={DetailSectionHeader}
//                     renderItem={({ item, index, section }) => {
//                         const onToggleHistory = () => {
//                             // 해당 Item의 Section Index
//                             const sectionIndex = employeeData.findIndex(
//                                 value =>
//                                     value.employeeType === section.employeeType,
//                             );

//                             // Employee State update
//                             setEmployeeData(prev => {
//                                 const updateData = [...prev];
//                                 updateData[sectionIndex].data[index].active =
//                                     !updateData[sectionIndex].data[index]
//                                         .active;
//                                 return updateData;
//                             });
//                         };

//                         const onModifySelectedItem = historyItem => {
//                             setSelectedData({
//                                 ...historyItem,
//                                 employeeType: section.employeeType,
//                                 name: item.name,
//                                 month,
//                             });
//                             onOpenModal();
//                         };

//                         return (
//                             <DetailHistoryItem
//                                 item={item}
//                                 onToggle={onToggleHistory}
//                                 onModifySelectedItem={onModifySelectedItem}
//                                 detailState={state}
//                             />
//                         );
//                     }}
//                     ItemSeparatorComponent={()=>{return <View style={styles.listSeparator} />}}
//                     renderSectionFooter={() => (
//                         <View style={styles.listFooter} />
//                     )}
//                     stickySectionHeadersEnabled
//                 />

//                 {/* 마감 신청 버튼 - state가 1(마감전)일 경우 */}
//                 {state === 1 && (
//                     <TouchableOpacity
//                         style={styles.deadlineButton}
//                         activeOpacity={0.8}>
//                         <Text style={styles.deadlineButtonText}>마감 신청</Text>
//                     </TouchableOpacity>
//                 )}
//             </Insets>
//         </View>
//     );
// }

// export default DetailsScreen;
