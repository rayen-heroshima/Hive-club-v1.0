import React from "react";

const Button = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#FBA705,45%,#E7FB05,55%,#FBA705)] bg-[length:200%_100%] px-6 font-medium text-black transition-colors focus:outline-none  capitalize ${otherClasses}`} >
      {position == "left" && icon}
      {title}
      {position == "right" && icon}
    </button>
  );
};

export default Button;
