import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import {CATEGORIES, MEALS} from '../data/dummy-data';

const CategoryMealScreen = (props) => {
    // receive the data passed by CategoriesScreen

    const renderMealItem = (itemData) => {
        return (
            <View>
                <Text>{itemData.item.title}</Text>
            </View>
        );
    };

    const catId = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter((meal) => 
        // this will be -1 if the category ID is not part of the category IDs
        meal.categoryIds.indexOf(catId) >= 0
    );

    return (
        <View style={styles.screen}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoryMealScreen;
