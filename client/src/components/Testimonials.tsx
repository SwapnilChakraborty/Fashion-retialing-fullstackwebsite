'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'Sarah Jenkins',
        role: 'Fashion Blogger',
        content: "The linen blazer is an absolute dream. I've never felt fabric this breathable yet structured. It's my go-to for summer meetings.",
        rating: 5,
        color: 'bg-lavender',
    },
    {
        name: 'Michael Chen',
        role: 'Creative Director',
        content: "Finally, a brand that understands 'oversized' doesn't mean ill-fitting. The work jacket is a staple in my rotation now.",
        rating: 5,
        color: 'bg-mint',
    },
    {
        name: 'Jessica Wu',
        role: 'Architect',
        content: "I live in the silk coords. They transition perfectly from the studio to dinner. The quality is unmatched for the price point.",
        rating: 5,
        color: 'bg-baby-blue',
    },
    {
        name: 'David Miller',
        role: 'Photographer',
        content: "The minimalist tee is exactly what I've been looking for. Heavyweight, boxy, and holds its shape after washes.",
        rating: 4,
        color: 'bg-cream',
    },
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
                <h2 className="text-5xl md:text-7xl font-bold font-oswald uppercase mb-4 reveal">
                    Happy Clients
                </h2>
                <p className="text-xl text-gray-500 reveal">
                    Don't just take our word for it.
                </p>
            </div>

            <motion.div
                style={{ x }}
                className="flex gap-8 px-4 w-max"
            >
                {TESTIMONIALS.map((testimonial, i) => (
                    <div
                        key={i}
                        className={`w-[85vw] md:w-[500px] p-6 md:p-12 rounded-3xl border-2 border-black flex flex-col justify-between shrink-0 hover:scale-[1.02] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${testimonial.color}`}
                    >
                        <div className="mb-6 md:mb-8">
                            <div className="flex gap-1 mb-3 md:mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 md:w-5 md:h-5 ${i < testimonial.rating ? 'fill-black text-black' : 'text-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-lg md:text-2xl font-medium leading-relaxed">
                                "{testimonial.content}"
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold font-oswald text-xl">
                                {testimonial.name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold font-oswald uppercase text-lg">
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm font-medium opacity-70">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Duplicate for infinite loop illusion involves complex logic, keeping it simple scroll-bound for now or just repeat content */}
                {TESTIMONIALS.map((testimonial, i) => (
                    <div
                        key={`dup-${i}`}
                        className={`w-[400px] md:w-[500px] p-8 md:p-12 rounded-3xl border-2 border-black flex flex-col justify-between shrink-0 hover:scale-[1.02] transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${testimonial.color}`}
                    >
                        <div className="mb-8">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-black text-black' : 'text-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl font-medium leading-relaxed">
                                "{testimonial.content}"
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold font-oswald text-xl">
                                {testimonial.name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold font-oswald uppercase text-lg">
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm font-medium opacity-70">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
