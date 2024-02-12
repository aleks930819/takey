'use client';

import React, { useState } from 'react';

import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionSectionProps {
  section: {
    title: string;
    content: React.ReactNode;
  };
  isActive: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  sectionIndex: number;
  icon?: 'plus' | 'arrow';
}

const AccordionSection = ({
  section,
  isActive,
  sectionIndex,
  setActiveIndex,
  icon = 'plus',
}: AccordionSectionProps) => {
  const toggleSection = () => {
    const nextIndex = isActive ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };

  const arrowIcon = isActive ? (
    <ChevronUp size={20} className="text-primary" />
  ) : (
    <ChevronDown size={20} className="text-primary" />
  );

  const plusIcon = isActive ? (
    <Minus size={20} className="text-primary" />
  ) : (
    <Plus size={20} className="text-primary" />
  );

  return (
    <div className="p-4 lg:max-w-xl w-full">
      <div
        className="flex w-full items-center justify-between pb-4  cursor-pointer select-none border-b "
        onClick={toggleSection}
      >
        <div className="text-lg font-medium ">{section.title}</div>
        <div className="">{icon === 'plus' ? plusIcon : arrowIcon}</div>
      </div>

      <section
        aria-hidden={!isActive}
        className={`overflow-hidden transition-all h-auto duration-300 ease-in-out text-star  ${
          isActive ? 'max-h-screen  visibility-visible pt-2' : 'max-h-0 visibility-hidden'
        }`}
      >
        <>{section.content}</>
      </section>
    </div>
  );
};

const Accordion = ({ sections, icon }: { sections: any; icon?: 'plus' | 'arrow' }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      {sections.map((section: any, index: number) => {
        return (
          <AccordionSection
            section={section}
            key={index}
            isActive={activeIndex === index}
            setActiveIndex={setActiveIndex}
            sectionIndex={index}
            icon={icon}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
