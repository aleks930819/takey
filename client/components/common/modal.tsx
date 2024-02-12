import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({
  children,
  ...props
}: ModalProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const modalContent = (
    <div
      className="fixed left-0 top-0 z-50 mb-auto mt-auto flex h-full   w-full transform items-center justify-center bg-black bg-opacity-80 transition-all duration-300 ease-in-out"
      {...props}
    >
      <>{children}</>
    </div>
  );

  return createPortal(modalContent, document.getElementById('modal-root') as HTMLElement);
};

export default Modal;
