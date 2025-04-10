"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name?: string;
  designation: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto w-full py-4 font-sans antialiased md:max-w-4xl px-2">
      <div className="relative grid grid-cols-1 gap-20">
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            {testimonials[active].name && (
              <h3 className="text-2xl font-bold text-foreground/80">
                {testimonials[active].name}
              </h3>
            )}
            <p className="text-sm text-foreground/50">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-2 text-lg text-foreground h-20">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 mt-4 items-center justify-end">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <ArrowLeftIcon className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <ArrowRightIcon className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
