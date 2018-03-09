import React from 'react';
import { StackNavigator } from 'react-navigation';

import LogInPage from '../screens/LogInPage';
import RegisterPage from '../screens/RegisterPage';
import TabIndex from '../screens/TabIndex';
import TabIndexServiceProvider from '../screens/TabIndexServiceProvider';
import MiddleManPortfolioServiceProvider from '../screens/MiddleManPortfolioServiceProvider';
import OrderPage from '../screens/OrderPage';

export const LogIn = StackNavigator({
        LogInPage: {
            screen: LogInPage
        },
        RegisterPage:{
            screen: RegisterPage
        },
        TabIndexServiceProvider: {
            screen: TabIndexServiceProvider
        },
        TabIndexPageClient: {
            screen: TabIndex
        },
        ViewPortfolio: {
            screen: MiddleManPortfolioServiceProvider
        },
        ViewOrder: {
            screen: OrderPage
        }
    }, {
        initialRouteName:  'LogInPage',
        headerMode: 'none',
    }
);

export default LogIn;