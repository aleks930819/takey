'use client';

import React from 'react';

import { Review } from '@/interfaces/reviews';
import { useClickAway } from '@uidotdev/usehooks';

import * as actions from '@/actions/reviews';

import { Modal } from '../common';
import { useRestaurantIdState } from '@/lib/state';

const DeleteReview = ({ review, closeModal }: { review: Review; closeModal: () => void }) => {
  const ref = useClickAway<HTMLDivElement>(closeModal);

  const currentRestaurantId = useRestaurantIdState((state) => state.restaurantId);

  return (
    <Modal>
      <div className="mx-auto flex w-[90%] flex-col gap-4 text-white lg:w-[30%]">
        <p>Are you sure you want to delete your review? This action cannot be undone.</p>
        <div className=" mx-auto flex w-[90%] flex-col gap-4 lg:w-[30%] lg:flex-row" ref={ref}>
          <button
            onClick={() => {
              actions.deleteReview(currentRestaurantId, review._id);
              closeModal();
            }}
            className="rounded-md bg-red-500 lg:p-2
          "
          >
            <span>Delete</span>
          </button>
          <button
            className="rounded-md border border-gray-400 lg:p-2"
            onClick={() => {
              closeModal();
            }}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReview;
