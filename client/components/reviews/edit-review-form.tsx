'use client';

import { Review } from '@/interfaces/reviews';
import { useClickAway } from '@uidotdev/usehooks';

import * as actions from '@/actions/reviews';

import { Modal } from '../common';
import { Button } from '../ui';
import { useRestaurantIdState } from '@/lib/state';

const EditReviewForm = ({ review, closeForm }: { review: Review; closeForm: () => void }) => {
  const ref = useClickAway<HTMLFormElement>(closeForm);

  const currentRestaurantId = useRestaurantIdState((state) => state.restaurantId);

  const editReview = actions.editReview.bind(null, {
    restaurantId: currentRestaurantId,
    reviewId: review._id,
  });

  return (
    <Modal>
      <form className=" mx-auto flex w-[90%] flex-col gap-4 lg:w-[30%]" ref={ref} action={editReview}>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-white">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            rows={3}
            defaultValue={review.review}
            className="mt-1 block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Edit your review here"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-white">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={review.rating}
            min={1}
            max={5}
            className="mt-1 block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Rating"
          />
        </div>
        <Button className="rounded-md lg:p-2">
          <span>Save</span>
        </Button>
      </form>
    </Modal>
  );
};

export default EditReviewForm;
