import type { Review } from "../composables/restaurants";

export default function getRestaurantRating(reviews: Review[]) {
  if (reviews && reviews?.length === 0) return 0;
  const total = reviews?.reduce((acc, review) => acc + review.rating, 0);
  return total / reviews?.length;
}
