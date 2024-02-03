import { cn } from '@/lib/utils';

interface SpaceContainerProps {
  className?: string;
  variant?: 'default' | 'small' | 'medium' | 'large' | 'xlarge' | 'xsmall';
}

const SpaceContainer = ({ className, variant = 'default' }: SpaceContainerProps) => {
  const classes = cn(
    'space-y-8',
    {
      'min-h-[50px] lg:min-h-[60px]': variant === 'default',
      'min-h-[30px] lg:min-h-[40px]': variant === 'small',
      'min-h-[15px] lg:min-h-[30px]': variant === 'xsmall',
      'min-h-[60px] lg:min-h-[80px]': variant === 'medium',
      'min-h-[80px] lg:min-h-[120px]': variant === 'large',
      'min-h-[120px] lg:min-h-[160px]': variant === 'xlarge',
    },
    className,
  );
  return <div className={classes} />;
};

export default SpaceContainer;
