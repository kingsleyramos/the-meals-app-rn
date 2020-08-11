import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Switch, Platform} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{true: Colors.primaryColor}}
                thumbColor={
                    Platform.OS === 'android' ? Colors.primaryColor : ''
                }
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FiltersScreen = (props) => {

    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            isVegetarian: isVegetarian
        }
        console.log(appliedFilters)
        // useCallBack is used so if any of the variables change,
        // the this function is re-rendered, but if anything else happens
        // this will not re-render
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])


    useEffect(() => {
        // This is used so the state can be accessible outside of of this function
        // set inside Params in navigation
        navigation.setParams({save: saveFilters})
        // we can add navigation as a dependency which means when this changes, this wil rebuild..
        // ...but if anything else in the props changes, this will not unnecessarily rerun the effect.
    },[saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGlutenFree}
                onChange={(newValue) => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label='Lactose-free'
                state={isLactoseFree}
                onChange={(newValue) => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                state={isVegan}
                onChange={(newValue) => setIsVegan(newValue)}
            />
            <FilterSwitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={(newValue) => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                ></Item>
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-save'
                    onPress={navData.navigation.getParam('save')}
                ></Item>
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
});

export default FiltersScreen;
