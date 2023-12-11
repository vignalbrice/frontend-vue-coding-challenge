<script setup lang="ts">
import type { Review } from '@/src/composables/restaurants';
import getRestaurantRating from '@/src/utils/getRestaurantRating';

defineProps<{
  reviews: Review[]
}>();

function getTotalRating(reviews: Review[]) {
  return reviews.length;
}

function getRating(reviews: Review[]) {
  return getRestaurantRating(reviews) > 0 ? getRestaurantRating(reviews).toFixed(2) : getRestaurantRating(reviews);
}
</script>

<template>
  <VCard class="va-company-review" tag="li">
    <div class="d-flex justify-center mt-auto text-h5 ml-2">
      Rating overview
    </div>

    <div class="va-rating d-flex align-center flex-column my-auto">
      <div class="va-rating-review">
        <h2>{{ getRating(reviews) }}</h2>
        <h5>/5</h5>
      </div>

      <VRating
        hover
        :length="5"
        :size="32"
        :model-value="getRestaurantRating(reviews)"
        active-color="#ffd055"
        color="#333"
      />
      <div class="px-3">
        {{ getTotalRating(reviews) }} ratings
      </div>
    </div>
    <div class="px-3">
      Reviews
    </div>
    <VCardText>
      <v-list
        bg-color="transparent"
        class="d-flex flex-column-reverse"
        density="compact"
      >
        <v-list-item v-for="(review, i) in reviews" :key="i">
          <template #append>
            <div class="rating-values">
              <span class="d-flex justify-end ml-2 review-text"> {{ review.text }} </span>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.va-company-review {
  height: 100%;
  width: 100%;
  max-width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.va-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
}
.va-rating-review {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 0.5rem 0;
   & > h2 {
    font-size: 3rem;
    font-weight: 400!important;
    margin: 0;
   }
}

.rating-values {
  max-width: 200px;
}
.review-text {
  font-weight: 400;
  line-height: 1.5;
  color: #000;
  margin-top: 0.5rem;
  white-space: pre-line;

  }
</style>
