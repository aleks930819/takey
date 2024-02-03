'use client';

import React, { useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';

import { cn } from '@/lib/utils';
import { ClientOnly } from '../common';
import { Cuisine } from '@/interfaces/cuisines';
import CuisinesSliderItem from './cuisinies-slider-item';

const ArrowButton = ({
  onClick,
  direction,
  className,
  isVisible,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
  className?: string;
  isVisible?: boolean;
}) => {
  return (
    <>
      <button
        aria-label={`${direction} image`}
        type="button"
        className={cn(
          `bg-primary-dark hidden rounded-full p-1  text-white lg:block ${
            direction === 'left' ? '-left-16' : '-right-16'
          } hover:primary-dark/60 absolute top-[40%]
          ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}
           z-50 -translate-y-1/2 transform transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        onClick={onClick}
      >
        {direction === 'left' ? <ChevronLeft size={25} /> : <ChevronRight size={25} />}
      </button>
    </>
  );
};

const CuisinesSlider = ({ cuisines }: { cuisines: Cuisine[] }) => {
  const swiperRef = useRef<any>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSliderEnd, setIsSliderEnd] = useState(false);

  const onSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      setCurrentSlideIndex(swiperRef.current.swiper.realIndex);
    }
    if (swiperRef.current.swiper.isEnd) {
      setIsSliderEnd(true);
    } else {
      setIsSliderEnd(false);
    }
  };

  const onNextImageClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const onPreviousImageClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <ClientOnly>
      <div className="relative mx-auto w-full lg:w-[80%]">
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          onSlideChange={onSlideChange}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {cuisines.map((cuisine) => (
            <SwiperSlide key={cuisine._id}>
              <CuisinesSliderItem cuisine={cuisine} />
            </SwiperSlide>
          ))}
        </Swiper>
        {cuisines.length > 4 && (
          <>
            <ArrowButton onClick={onPreviousImageClick} direction="left" isVisible={currentSlideIndex > 0} />
            <ArrowButton onClick={onNextImageClick} direction="right" isVisible={!isSliderEnd} />
          </>
        )}
      </div>
    </ClientOnly>
  );
};

export default CuisinesSlider;
