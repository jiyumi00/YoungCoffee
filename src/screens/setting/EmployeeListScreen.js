import React, { Component } from 'react';

// Components
import EmployeeForm from '../../components/setting/EmployeeForm';

const TEST_DATA = [
    {
        id: 1,
        name: '김가가',
        createdAt: 1677628800000,
        annualIncome: 40000000,
        active: true,
    },
    {
        id: 2,
        name: '이나나',
        createdAt: 1677628800000,
        annualIncome: 30000000,
        active: true,
    },
    {
        id: 3,
        name: '김가가',
        createdAt: 1677628800000,
        annualIncome: 40000000,
        active: false,
    },
];

export default class EmployeeListScreen extends Component {

    render() {
        return (
            <EmployeeForm data={TEST_DATA} />
        );
    }
}

