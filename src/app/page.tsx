'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="max-w-2xl w-full text-center">
        {/* Nepal Flag Image */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/assets/Flag_of_Nepal.gif"
            alt="Nepal Flag"
            width={200}
            height={200}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F4392] mb-12">
          Digital Nepal
        </h1>

        {/* Description Box - Red BG with White Text & Blue Border */}
        <div className="bg-[#C41E3A] border-4 border-[#174BA1] rounded-xl p-6 mb-8 shadow-lg">
          <p className="text-white text-3xl md:text-4xl leading-relaxed font-black">
            Creating something interesting for Nepal
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-[#C41E3A] text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg">
            Get Started
          </button>
          <button className="border-3 border-[#001D3D] text-[#001D3D] px-8 py-3 rounded-lg font-bold hover:bg-[#001D3D] hover:text-white transition">
            Learn More
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-[#001D3D]">
          <p className="text-[#001D3D] text-sm font-semibold">
            🇳🇵 © 2026 Intersect Info Developers
          </p>
        </div>
      </div>
    </div>
  );
}
