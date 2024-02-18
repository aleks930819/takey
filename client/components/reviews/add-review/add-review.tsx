'use client';

import React, { useState } from 'react';
import { Pen, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuthModalState } from '@/lib/state';
import AddReviewForm from './add-review-from';
import { Button } from '@/components/ui';

interface AddReviewProps {
  isAuthenticated: boolean;
  className?: string;
}

const GuesstUserMessage = () => {
  return (
    <>
      <User size={20} />
      Sign in to add a review
    </>
  );
};

const SignInUserMessage = () => {
  return (
    <>
      <Pen size={20} />
      Add Review
    </>
  );
};

//TODO: Refactor this comonent
const AddReview = ({ isAuthenticated, className }: AddReviewProps) => {
  const { showAuthModal } = useAuthModalState();
  const [showForm, setShowForm] = useState(false);

  const handleAddReview = () => {
    if (isAuthenticated) {
      setShowForm(true);
    } else {
      showAuthModal();
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className={cn(
          `fixed 
        bottom-0 
        left-0 
        right-0 
        mx-auto 
        flex 
        items-center 
        justify-center 
        gap-2 `,
          className,
        )}
        onClick={handleAddReview}
      >
        {isAuthenticated ? <SignInUserMessage /> : <GuesstUserMessage />}
      </Button>
      {showForm && (
        <AddReviewForm
          closeModal={() => {
            setShowForm(false);
          }}
        />
      )}
    </>
  );
};

export default AddReview;
