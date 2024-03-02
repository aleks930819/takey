'use client';

import { Pen, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { Review } from '@/interfaces/reviews';

import EditReviewForm from './edit-review-form';
import DeleteReview from './delete-review';

const OwnerActionButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button className="flex items-center gap-2 text-sm" onClick={onClick}>
      {children}
    </button>
  );
};

const OwnerActions = ({ review }: { review: Review }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleEdit = () => {
    setShowEdit(true);
  };

  return (
    <>
      <div className="mt-4 flex items-center gap-2">
        <OwnerActionButton
          onClick={() => {
            handleEdit();
          }}
        >
          <Pen size={18} />
          <span>Edit</span>
        </OwnerActionButton>
        <OwnerActionButton
          onClick={() => {
            setShowDelete(true);
          }}
        >
          <Trash size={18} />
          <span>Delete</span>
        </OwnerActionButton>
      </div>
      {showEdit && <EditReviewForm review={review} closeForm={() => setShowEdit(false)} />}
      {showDelete && <DeleteReview review={review} closeModal={() => setShowDelete(false)} />}
    </>
  );
};

export default OwnerActions;
