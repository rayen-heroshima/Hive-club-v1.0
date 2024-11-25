import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-6", className)} // Added gap-6 for spacing between cards
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block "
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0  bg-neutral-200, bg-[#FBA705] block rounded-[45px]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-[45px] h-[300px] w-[350px] p-6 bg-white shadow-lg overflow-hidden border border-transparent group-hover:border-slate-700 relative z-20", // Updated CSS for white background, shadow, border-radius, height, width
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 className={cn("text-zinc-900 font-bold tracking-wide  text-xl", className)}> {/* Changed text color to dark */}
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p className={cn(" text-zinc-600 tracking-wide leading-relaxed text-sm", className)}> {/* Changed text color to dark gray */}
      {children}
    </p>
  );
};

