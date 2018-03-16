import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from '../styles/color';
import { Text } from 'react-native';

import TabSearch from '../screens/TabSearch';
import TabMessages from '../screens/TabMessages';
import TabPortfolio from '../screens/TabPortfolio';
// import TabFavourites from '../screens/TabFavourites';
import TabAccount from '../screens/TabAccount';

export const Root = TabNavigator(
    {
        TabSearch: {
            screen: TabSearch
        },
        TabPortfolio: {
            screen: TabPortfolio
        },
        TabMessages: {
            screen: TabMessages
        },
        // TabFavourites: {
        //     screen: TabFavourites
        // },
        TabAccount: {
            screen: TabAccount
        }
    },{
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let type = 'font-awesome';
                if (routeName === 'TabSearch') {
                    iconName = 'home';
                } else if (routeName === 'TabPortfolio') {
                    iconName = 'layers';
                    type = '';
                } else if (routeName === 'TabMessages') {
                    iconName = 'envelope';
                // } else if (routeName === 'TabFavourites') {
                //     iconName = 'rss-feed';
                } else if (routeName === 'TabAccount') {
                    iconName = 'user';
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} type={type} color={tintColor} />;
            },
            tabBarLabel: () => {
                const { routeName } = navigation.state;
                let iconLabel;
                if (routeName === 'TabSearch') {
                    iconLabel = 'Search';
                } else if (routeName === 'TabPortfolio') {
                    iconLabel = 'Portfolio';
                } else if (routeName === 'TabMessages') {
                    iconLabel = 'Messages';
                // } else if (routeName === 'TabFavourites') {
                //     iconLabel = 'Favourites';
                } else if (routeName === 'TabAccount') {
                    iconLabel = 'Account';
                }
                return <Text style={{fontSize: 10, color: colors.tabNavIconOn}}>{iconLabel}</Text>;
            }
        }),
        tabBarOptions: {
            activeTintColor: colors.tabNavIconOn,
            inactiveTintColor: colors.tabNavIconOff,
            style: {backgroundColor: colors.tabNavBackground},
            indicatorStyle: {
                backgroundColor: colors.tabNavBorderBottom,
            },
            showIcon: true,
            showLabel: false,
        },
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    }
);
