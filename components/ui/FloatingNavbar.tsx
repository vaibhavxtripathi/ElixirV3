"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
        setIsScrolled(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        }
        setIsScrolled(true);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-8 py-5 rounded-lg border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-between",
          className
        )}
        style={{
          ...(isScrolled ? {
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          } : {}),
          willChange: 'transform, opacity',
        }}
      >
        {/* Elixir text on the left */}
        <motion.div
          animate={{
            scale: isScrolled ? 0.95 : 1,
            x: isScrolled ? 10 : 0,
            marginRight: isScrolled ? 48 : 224
          }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={cn(
            "flex items-center gap-2 text-white font-bold text-xl transition-all duration-400",
            isScrolled ? "mr-12" : "mr-56"
          )}
          style={{ willChange: 'transform, opacity, margin-right' }}
        >
          <Image
            src="/Elixir-logo.png"
            alt="Elixir Logo"
            width={28}
            height={28}
            className="rounded-md mr-2"
            style={{ objectFit: 'contain' }}
          />
          <span>Elixir</span>
        </motion.div>

        {/* Navigation items in the center */}
        <motion.div
          animate={{
            scale: isScrolled ? 0.98 : 1,
            opacity: isScrolled ? 0.9 : 1
          }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex items-center space-x-4"
          style={{ willChange: 'transform, opacity' }}
        >
          {navItems.map((navItem: any, idx: number) => (
            <motion.div
              key={`link=${idx}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <Link
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="text-sm !cursor-pointer">{navItem.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Login button on the right */}
        <motion.button
          animate={{
            scale: isScrolled ? 0.95 : 1,
            x: isScrolled ? -10 : 0,
            marginLeft: isScrolled ? 48 : 224
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={cn(
            "border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-400",
            isScrolled ? "ml-12" : "ml-56"
          )}
          style={{ willChange: 'transform, opacity, margin-left' }}
        >
          <Link href={'/dashboard'}>Login</Link>
          <motion.span
            animate={{
              scale: isScrolled ? 0.9 : 1,
              opacity: isScrolled ? 0.8 : 1
            }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px"
            style={{ willChange: 'transform, opacity' }}
          />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
