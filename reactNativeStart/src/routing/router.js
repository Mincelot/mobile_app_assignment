import React from 'react';
import { StackNavigator } from 'react-navigation';

import LogInPage from '../screens/LogInPage';
import TabIndex from '../screens/TabIndex';

export const LogIn = StackNavigator({
        LogInPage: {
            screen: LogInPage
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