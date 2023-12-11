<script setup lang="ts">
import { useFetchRestaurant } from '~/composables/restaurants';
import getRestaurantRating from '~/utils/getRestaurantRating';

const { params } = useRoute();
const { data: restaurant, isError, error } = useFetchRestaurant({ restaurantId: params.restaurantId });

function getFormattedPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, `($1) $2-$3`);
}
</script>

<template>
  <VAlert v-if="isError" type="warning" class="mt-4" theme="light" text="warning" density="default" variant="tonal">
    {{ (error as unknown as Error).message ?? null }}
    <br>
  </VAlert>
  <div v-else class="restaurant-container grid grid-cols-[minmax(0,_1fr)_16rem] gap-6">
    <VCard v-if="restaurant">
      <VImg
        v-for="photo in restaurant.photos"
        :key="photo"
        :src="restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ restaurant.name }}
        </VCardTitle>
        <VRating
          hover
          :length="5"
          :size="32"
          :model-value="getRestaurantRating(restaurant.reviews)"
          active-color="#ffd055"
          color="#FFFF"
        />
      </VImg>
      <VCardText>
        <div class="grid grid-cols-2 gap-4">
          <RestaurantLocation :location="restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ getFormattedPhone(restaurant.phone) }}
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>
    <aside v-if="restaurant">
      <ul class="pa-0">
        <RestaurantReview :reviews="restaurant.reviews" />
      </ul>
    </aside>
  </div>
</template>

<style lang="css" scoped>
.restaurant-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem;
}

@media screen and (max-width: 640px) {
  .restaurant-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
