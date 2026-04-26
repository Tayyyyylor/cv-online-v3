type Props = {
  className?: string;
};

export const BurgerLine = ({ className = "" }: Props) => (
  <span
    className={`block w-8 h-1 bg-[var(--foreground)] rounded-[10px] transition-all duration-300 origin-[1px] ${className}`}
  />
);
