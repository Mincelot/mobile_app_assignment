import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from '../styles/color';

import Tab1 from '../screens/Tab1';
import Tab2 from '../screens/Tab2';
import Tab3 from '../screens/Tab3';

export const Root = TabNavigator(
    {
        Tab1: {
            screen: Tab1
        },
        Tab2: {
            screen: Tab2
        },
        Tab3: {
            screen: Tab3
        }
    },{
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Tab1') {
                    iconName = 'list';
                } else if (routeName === 'Tab2') {
                    iconName = 'rowing';
                } else if (routeName === 'Tab3') {
                    iconName = 'rss-feed';
                }
        
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} size={25} color={tintColor} />;
            },
            tabBarLabel: () => {
                const { routeName } = navigation.state;
                let iconLabel;
                if (routeName === 'Tab1') {
                    iconLabel = 'Welcome';
                } else if (routeName === 'Tab2') {
                    iconLabel = 'Test2';
                } else if (routeName === 'Tab3') {
                    iconLabel = 'List';
                }
                return iconLabel;
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
