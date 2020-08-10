import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons' // Note this is HeaderButtons not HeaderButton. Note this is plural

import {CATEGORIES, MEALS} from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealScreen = (props) => {
    // receive the data passed by CategoriesScreen

    const renderMealItem = (itemData) => {
        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    // Navigate to the MealDetailScreen
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        // This will pass the meal ID to the MealDetailScreen
                        params: {
                            mealId: itemData.item.id,
                        },
                    });
                }}
            />
        );
    };

    const catId = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(
        (meal) =>
            // this will be -1 if the category ID is not part of the category IDs
            meal.categoryIds.indexOf(catId) >= 0
    );

    return (
        <View style={styles.screen}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{width: '100%'}}
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
        padding: 15,
    },
});

export default CategoryMealScreen;
