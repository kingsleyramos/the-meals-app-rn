import React from 'react';
import {HeaderButtons} from 'react-navigation-header-buttons'; // Note this is HeaderButtons not HeaderButton. Note this is plural

import {CATEGORIES, MEALS} from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = (props) => {
    // receive the data passed by CategoriesScreen

    const catId = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(
        (meal) =>
            // this will be -1 if the category ID is not part of the category IDs
            meal.categoryIds.indexOf(catId) >= 0
    );

    return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};

export default CategoryMealScreen;
