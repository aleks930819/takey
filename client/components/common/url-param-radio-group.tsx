'use client';

import React from 'react';
import { useUpdateUrlSearchParams } from '@/hooks';

import { RadioInput } from '../ui/radio-input';
import { useSearchParams } from 'next/navigation';

type MongoDbOperator = 'lte' | 'gte';

interface URLParamRadioGroupProps {
  paramName: string;
  legend: string;
  mongoDBOperator?: MongoDbOperator;
  options: { label: string; value: string }[];
}

const URLParamRadioGroup = ({ paramName, options, legend, mongoDBOperator = 'lte' }: URLParamRadioGroupProps) => {
  const { updateURL } = useUpdateUrlSearchParams();

  const searchParams = useSearchParams();

  const paramValue = searchParams.get(`${paramName}[${mongoDBOperator}]`);

  const selectedOption = options.find((option) => option.value === paramValue);

  const handleOptionChange = (value: string) => {
    updateURL({ param: `${paramName}[${mongoDBOperator}]`, value });
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <fieldset>
        <legend className="mb-4 text-lg font-bold ">{legend}</legend>
        {options.map((option) => (
          <RadioInput
            key={option.value}
            label={option.label}
            name={paramName}
            value={option.value}
            checked={option.value === selectedOption?.value}
            onChange={() => handleOptionChange(option.value)}
            id={option.value.toString()}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default URLParamRadioGroup;
