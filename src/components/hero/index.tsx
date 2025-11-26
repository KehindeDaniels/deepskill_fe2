"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent dark:from-indigo-700/25" />

      {/* Soft glow orbs */}
      <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-10 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <h1
          data-aos="fade-up"
          className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl"
        >
          Unlock Human Potential with{" "}
          <span className="bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Deep Learning Experiences
          </span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
        >
          Transform your personal and professional growth through science-based
          modules, immersive content, and guided learning paths designed for
          real-world impact.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-10 flex justify-center gap-4"
        >
          <Button size="lg" className="rounded-full px-8 text-base font-medium">
            Explore Modules
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-indigo-300/40 bg-white/40 px-8 text-base backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/40"
          >
            How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}
