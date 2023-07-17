import React from 'react';

// Components
import EmployeeForm from '../../components/setting/EmployeeForm';

const TEST_DATA = [
    {
        id: 1,
        name: '박바바',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: true,
    },
    {
        id: 2,
        name: '이나나',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: true,
    },
    {
        id: 3,
        name: '이아아',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: true,
    },
    {
        id: 4,
        name: '김자자',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: false,
    },
];
const PartTimeListScreen = () => {
    return <EmployeeForm data={TEST_DATA} />;
};

export default PartTimeListScreen;
