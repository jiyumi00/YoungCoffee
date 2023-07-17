import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Text from '../common/Text';

// Styles
const styles = StyleSheet.create({
    detailsHeader: {
        paddingVertical: 8,
        paddingHorizontal: 25,
        marginTop: 10,
    },
    detailsHeaderText: {
        fontSize: 15,
        fontWeight: '600',
        color: THEME.COLOR.GRAY_COLOR,
    },
});

export default class DetailsSectionHeader extends Component {
    constructor(props) {
        super(props);
        this.employeeType = this.props.section;
    }
    render() {
        return (
            <View style={styles.detailsHeader}>
                <Text style={styles.detailsHeaderText}>{this.employeeType}</Text>
            </View>

        );
    }
}


// function DetailsSectionHeader({ section: { employeeType } }) {
//     return (
//         <View style={styles.detailsHeader}>
//             <Text style={styles.detailsHeaderText}>{employeeType}</Text>
//         </View>
//     );
// }
// export default DetailsSectionHeader;

// export default class DetailsSectionHeader extends Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             section : this.state.employeeType,
//             employeeType : this.props.employeeType
//         }
//     }
//     render() {
//         return (
//             <View style={styles.detailsHeader}>
//                 <Text style={styles.detailsHeaderText}>{employeeType}</Text>
//             </View>
//         );
//     }
// };
