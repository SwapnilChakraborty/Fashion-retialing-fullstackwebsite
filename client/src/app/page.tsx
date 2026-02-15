'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Testimonials from '@/components/Testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();

      tl.from('.hero-char', {
        yPercent: 100,
        rotation: 10,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      })
        .from('.hero-sub', {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.5')
        .from('.hero-btn', {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6');

      // Scroll Animations for sections
      gsap.utils.toArray('.reveal').forEach((section: any) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533561797500-4fad4750814e?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 text-center text-white px-4 mt-20 md:mt-0">
          <h1 className="text-[15vw] md:text-[12vw] font-bold leading-[0.9] md:leading-[0.8] tracking-tighter uppercase font-oswald mb-6 md:mb-4 overflow-hidden">
            <div className="hero-line overflow-hidden">
              {'Made For'.split('').map((char, i) => (
                <span key={i} className="hero-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </div>
            <div className="hero-line overflow-hidden">
              {'Comfort'.split('').map((char, i) => (
                <span key={i} className="hero-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </div>
          </h1>
          <div className="overflow-hidden">
            <p className="hero-sub text-base md:text-xl font-medium tracking-widest uppercase mb-8 md:mb-8 max-w-[80vw] mx-auto">
              Explore our breezy summer collection now
            </p>
          </div>
          <div className="hero-btn overflow-hidden">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-none px-6 py-4 text-lg md:px-8 md:py-6 md:text-xl h-auto">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Grid Section */}
      <section id="collection" className="bg-lavender py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">

          {/* Item 1: The Work Jacket */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center group">
            <div className="relative aspect-[4/5] bg-white p-4 rotate-1 shadow-xl transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000"
                alt="The Work Jacket"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-black uppercase font-oswald tracking-tight">The Work Jacket</h2>
              <p className="text-lg md:text-xl font-medium text-gray-800">100% Cotton, made baggy for comfort.</p>
              <p className="text-lg text-gray-600">₱1,200</p>
              <Link href="/payment-demo">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white transition-colors duration-300">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Item 2: Linen Coords (Reversed) */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-mint p-6 md:p-12 -mx-4 md:-mx-12 rounded-3xl group">
            <div className="order-2 md:order-1 space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-black uppercase font-oswald tracking-tight">Linen Coords</h2>
              <p className="text-lg md:text-xl font-medium text-gray-800">A cool linen blend in pastel shades.</p>
              <p className="text-lg text-gray-600">₱1,000</p>
              <Button className="bg-black text-white hover:bg-gray-800 transition-colors">
                Note: Sold as set
              </Button>
            </div>
            <div className="order-1 md:order-2 relative aspect-square bg-white p-4 -rotate-1 shadow-xl transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000"
                alt="Linen Coords"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Item 3: Corporate Cool */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-baby-blue p-6 md:p-12 -mx-4 md:-mx-12 rounded-3xl group">
            <div className="relative aspect-video bg-white p-4 rotate-1 shadow-xl transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-105 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1000"
                alt="Corporate Cool"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-black uppercase font-oswald tracking-tight">Corporate Cool</h2>
              <p className="text-lg md:text-xl font-medium text-gray-800">100% Silk. 100% Office-ready.</p>
              <p className="text-lg text-gray-600">₱2,000</p>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white transition-colors duration-300">
                Shop Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer Banner */}
      <section className="relative py-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold font-oswald uppercase tracking-tighter">
            Free Shipping On Your<br />First Order
          </h2>
          <Link href="/register">
            <Button size="lg" className="bg-lavender text-black hover:bg-white text-lg px-12 h-16">
              Sign Me Up!
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
