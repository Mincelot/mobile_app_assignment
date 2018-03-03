import React from 'react';
import { StackNavigator } from 'react-navigation';

import LogInPage from '../screens/LogInPage';
import RegisterPage from '../screens/RegisterPage';
import TabIndex from '../screens/TabIndex';

export const LogIn = StackNavigator({
        LogInPage: {
            screen: LogInPage
        },
        RegisterPage:{
            screen: RegisterPage
        },
        TabIndexPage: {
            screen: TabIndex
        },
    }, {
        initialRouteName:  'LogInPage',
        headerMode: 'none',
    }
);

export default LogIn;