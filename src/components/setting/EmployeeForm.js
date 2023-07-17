import React, { useCallback,Component} from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

// Components
import EmployeeHeader from './EmployeeHeader';
import Image from '../common/Image';

// Constants
import { THEME } from '../../constants/theme';

// Utils
import { amountFormat } from '../../utils/AmountFormat';
import Text from '../common/Text';

// Images
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    contents: {
        flex: 1,
    },
    employee: {
        paddingVertical: 18,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    employeeName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    employeeNameText: {
        fontSize: 17,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    deactivationText: {
        color: THEME.COLOR.SILVER,
    },
    linkIcon: {
        width: 12,
        height: 12,
        marginLeft: 10,
    },
    employeeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    employeeInfoText: {
        fontSize: 15,
        fontWeight: '300',
        color: THEME.COLOR.GRAY_COLOR,
    },
    createdAt: {},
    line: {
        width: 1,
        height: 14,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
        marginHorizontal: 12,
    },
    annualIncome: {},
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
    },
});

// export default class EmployeeForm extends Component{

//     constructor(props){
//         super(props);

//         this.state={

//         }
//     }
//     render(){
//         //const fullTimeEmployee = route.name === 'EmployeeList';
//         const fullTimeEmployee =true;
//         return(
//             <View style={styles.container}>
//             {/* Header */}
//             <EmployeeHeader fullTimeEmployee={fullTimeEmployee} />

//             <FlatList
//                 contentContainerStyle={{ flexGrow: 1 }}
//                 keyExtractor={item => item.id.toString()}
//                 data={data}
//                 renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={this.props.navigation}/> }
//                 ItemSeparatorComponent={ItemSeparatorComponent}
//                 ListFooterComponent={ItemSeparatorComponent}
//             />
//         </View>
//         )
//     }
// }
// class RenderItem extends Component{

//     constructor(props){
//         super(props);
//         this.navigation=this.props.navigation;
//         this.item=this.props.item;
//         this.state={

//         }
//     }
//     onPress = () => {
//         this.navigation.navigate('EmployeeDetail', {
//             userID: this.item.id,
//             employeeType: fullTimeEmployee ? 'fullTime' : 'partTime',
//         });
//     };
//     render(){
//         return(
//             <Pressable style={styles.employee} onPress={this.onPress}>
//                     {/* Left Contents - 이름 */}
//                     <View style={styles.employeeName}>
//                         <Text
//                             style={[
//                                 styles.employeeNameText,
//                                 !item.active ? styles.deactivationText : null,
//                             ]}>
//                             {this.item.name}
//                         </Text>
//                         <Image source={LinkIcon} style={styles.linkIcon} />
//                     </View>

//                     {/* 
//                 - 입사일, 연봉
//                 - 활성화된 직원일 경우에만 정보 표시
//                  */}
//                     {this.item.active && (
//                         <View style={styles.employeeInfo}>
//                             <View style={styles.createdAt}>
//                                 <Text style={styles.employeeInfoText}>
//                                     {date}
//                                 </Text>
//                             </View>
//                             <View style={styles.line} />
//                             <View style={styles.annualIncome}>
//                                 <Text style={styles.employeeInfoText}>
//                                     {annualIncome}원
//                                 </Text>
//                             </View>
//                         </View>
//                     )}
//                 </Pressable>
//         )
//     }
// }



function ItemSeparatorComponent() {
    return <View style={styles.separator} />;
}

function EmployeeForm({ data }) {
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route)
    const fullTimeEmployee = route.name === 'EmployeeList';

    const renderItem = useCallback(
        ({ item }) => {
            const date = dayjs(item.createdAt).format('YYYY. MM. DD');
            const annualIncome = fullTimeEmployee
                ? item.annualIncome
                : amountFormat(item.annualIncome);

            const onPress = () => {
                navigation.navigate('EmployeeDetail', {
                    userID: item.id,
                    employeeType: fullTimeEmployee ? 'fullTime' : 'partTime',
                });
            };

            // TODO  fullTimeEmployee일 경우 만원단위 포맷
            return (
                <Pressable style={styles.employee} onPress={onPress}>
                    {/* Left Contents - 이름 */}
                    <View style={styles.employeeName}>
                        <Text
                            style={[
                                styles.employeeNameText,
                                !item.active ? styles.deactivationText : null,
                            ]}>
                            {item.name}
                        </Text>
                        <Image source={LinkIcon} style={styles.linkIcon} />
                    </View>

                    {/* 
                - 입사일, 연봉
                - 활성화된 직원일 경우에만 정보 표시
                 */}
                    {item.active && (
                        <View style={styles.employeeInfo}>
                            <View style={styles.createdAt}>
                                <Text style={styles.employeeInfoText}>
                                    {date}
                                </Text>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.annualIncome}>
                                <Text style={styles.employeeInfoText}>
                                    {annualIncome}원
                                </Text>
                            </View>
                        </View>
                    )}
                </Pressable>
            );
        },
        [fullTimeEmployee],
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <EmployeeHeader fullTimeEmployee={fullTimeEmployee} />

            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={item => item.id.toString()}
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListFooterComponent={ItemSeparatorComponent}
            />
        </View>
    );
}

export default EmployeeForm;
