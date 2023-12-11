<script setup lang="ts">
import getRestaurantRating from '../utils/getRestaurantRating';
import { useFetchRestaurants } from '~/composables/restaurants';

const { data: restaurants, isError } = useFetchRestaurants();

const ratingFilter = ref(0);

const filteredRestaurants = computed(() => {
  return restaurants.value?.filter((restaurant) => {
    return getRestaurantRating(restaurant.reviews) >= ratingFilter.value;
  }).sort((a, b) => {
    if (ratingFilter.value === 0) return getRestaurantRating(b.reviews) - getRestaurantRating(a.reviews);
    return getRestaurantRating(a.reviews) - getRestaurantRating(b.reviews);
  });
});

const filterByRating = (rating: number) => ratingFilter.value = rating;
</script>

<template>
  <div>
    <RatingFilter class="my-4" @filter-by-rating="filterByRating" />

    <LoadingError v-if="isError" />
    <div v-else-if="filteredRestaurants" class="restaurant-grid">
      <RestaurantCard
        v-for="restaurant of filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
}
</style>
