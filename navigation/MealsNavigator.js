import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen',
};

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        mealDetail: MealDetailScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-restaurant'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
        },
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.accentColor,
        },
    },
};

const MealsFavTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
              activeTintColor: 'white',
              shifting: true, // This will show the title of the tab if selected
              barStyle: {
                  backgroundColor: Colors.primaryColor,
              },
          })
        : createBottomTabNavigator(tabScreenConfig, {
              tabBarOptions: {
                  activeTintColor: Colors.accentColor,
              },
          });

export default createAppContainer(MealsFavTabNavigator);
