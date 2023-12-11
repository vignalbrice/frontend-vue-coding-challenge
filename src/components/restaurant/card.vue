<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';
import getRestaurantRating from '~/utils/getRestaurantRating';

defineProps<{
  restaurant: Restaurant
}>();
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="restaurant?.photos?.[0]"
    />
    <VCardTitle>
      {{ restaurant?.name }}
    </VCardTitle>
    <VRating
      hover
      :length="5"
      :size="32"
      :model-value="getRestaurantRating(restaurant?.reviews)"
      active-color="#ffd055"
    />
    <VCardText>
      <RestaurantLocation :location="restaurant?.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${restaurant?.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
