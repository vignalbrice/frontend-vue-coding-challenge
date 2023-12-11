import { mount } from '@vue/test-utils';

import RestaurantReview from './review.vue';
import restaurantsResponse from '@/mock/restaurants.json';

const restaurant = restaurantsResponse[0];

describe(`restaurant-review`, () => {
  test.todo(`no props`, (context) => {
    const wrapper = mount(RestaurantReview, {
      global: { plugins: [context.router] },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it.todo(`renders a review`, (context) => {
    const wrapper = mount(RestaurantReview, {
      global: { plugins: [context.router] },
      props: { reviews: restaurant.reviews },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
