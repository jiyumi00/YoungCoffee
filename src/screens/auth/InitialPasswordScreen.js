import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';
import { PASSWORD_INPUT } from '../../constants/input';

// Components
import Insets from '../../components/common/Insets';
import SubmitButton from '../../components/common/SubmitButton';
import InputBox from '../../components/common/InputBox';
import Logo from '../../components/common/Logo';
import Input from '../../components/common/Input';
import { HandleSpaceRemoval } from '../../utils/inputSpace';
import Text from '../../components/common/Text';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...THEME.CONTENTS_PADDING,
    },

    headerTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerMainText: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    headerSubText: {
        marginTop: 6,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        color: THEME.COLOR.GRAY_COLOR,
    },
    form: {
        flex: 1,
        ...THEME.CONTENTS_PADDING,
    },
});

/**
 * @title (최초 로그인) 비밀번호 설정 스크린
 * @returns
 * @todo
 * - 비밀번호 업데이트 API 요청
 * - isLoggedIn 상태 업데이트
 * - State Cleanup
 */
function InitialPasswordScreen({ route }) {
    // params를 받기 위해 사용
    const {
        params: { user },
    } = route;

    /**
     * Disabled UI 구현을 확인하기 위해 임시로 State 지정
     */
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // Button Disabled
    const disabled = !id || !password || !passwordConfirm;

    // SubmitButton
    const onSubmit = () => {
        /**
         * 비밀번호 설정 API 호출
         * 전역으로 관리되는 isLoggedIn 상태 변경
         * - 상태가 변경되면 자동으로 메인스크린으로 이동됨
         * - RootNavigation.tsx에서 제어
         */
    };

    // ID Input Update
    useEffect(() => {
        if (user?.id) setID(user?.id);
    }, [user?.id]);

    return (
        <View style={styles.container}>
            {/* Insets */}
            <Insets>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Header */}
                    <View style={styles.header}>
                        {/* Logo */}
                        <Logo />

                        {/* Header Text View */}
                        <View style={styles.headerTextView}>
                            <Text style={styles.headerMainText}>
                                사용할 비밀번호를 입력해주세요.
                            </Text>

                            <Text style={styles.headerSubText}>
                                영커피 센텀점님의 최초 로그인입니다.
                            </Text>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* ID */}
                        <InputBox
                            label='아이디'
                            input={
                                <Input
                                    value={id}
                                    onChangeText={HandleSpaceRemoval(setID)}
                                    editable={false}
                                />
                            }
                        />

                        {/* Password */}
                        <InputBox
                            label='사용할 비밀번호'
                            input={
                                <Input
                                    placeholder='사용할 비밀번호를 입력해주세요.'
                                    value={password}
                                    onChangeText={HandleSpaceRemoval(
                                        setPassword,
                                    )}
                                    {...PASSWORD_INPUT}
                                />
                            }
                        />

                        {/* Password Confirm */}
                        <InputBox
                            label='사용할 비밀번호 확인'
                            input={
                                <Input
                                    placeholder='비밀번호를 다시 한번 입력해주세요.'
                                    value={passwordConfirm}
                                    onChangeText={HandleSpaceRemoval(
                                        setPasswordConfirm,
                                    )}
                                    {...PASSWORD_INPUT}
                                />
                            }
                        />
                    </View>
                </ScrollView>

                {/* Submit Button */}
                <SubmitButton
                    label='비밀번호 변경'
                    onSubmit={onSubmit}
                    disabled={disabled}
                />
            </Insets>
        </View>
    );
}

export default InitialPasswordScreen;
