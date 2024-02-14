'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { useClickAway } from '@uidotdev/usehooks';
import { addReview } from '@/actions/reviews';

import { Modal } from '@/components/common';
import { Button } from '@/components/ui';
import { usePathname } from 'next/navigation';

const AddReviewForm = ({ closeModal }: { closeModal: () => void }) => {
  const [state, formAction] = useFormState(addReview, undefined);
  const restaurantId = usePathname().split('/')[2];

  const ref = useClickAway(() => {
    closeModal();
  });
  const { pending } = useFormStatus();

  return (
    <Modal>
      <form ref={ref as any} className="flex w-[90%] flex-col gap-4 lg:w-1/2" action={formAction}>
        <textarea
          className="relative  w-full rounded-lg  px-4 py-2"
          placeholder="Your review"
          name="review"
          id="review"
          rows={4}
        />
        <input name="restaurantId" id="restaurantId" type="text" value={restaurantId} className="hidden" />
        <input
          type="number"
          name="rating"
          id="rating"
          placeholder="Rating"
          className="relative  w-full rounded-lg  px-4 py-2"
        />
        {state?.message && <p className="text-center text-base text-red-500">{state.message}</p>}
        <Button aria-disabled={pending} disabled={pending}>
          {pending ? 'Adding Review...' : 'Add Review'}
        </Button>
      </form>
    </Modal>
  );
};

export default AddReviewForm;
