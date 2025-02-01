'use client';
import Image from "next/image";
// import { BackgroundGradientAnimation } from './ui/background-gradient-animation';

export default function About() {
  return (
    <div
    id="about" className="py-6 md:p-28 relative"> {/* Ensure overflow is hidden for background animation */}

      <div className="flex flex-col md:flex-row gap-10 md:gap-44 relative z-10"> {/* Responsive layout for different screen sizes */}
        {/* Left Column */}
        <div className="flex flex-col justify-around gap-8 md:gap-20">
          <div className="relative pr-6">
            {/* Video element with full width and height */}
            <video
              className="w-full h-full object-cover rounded-lg shadow-lg"
              autoPlay
              loop
              muted
            >
              <source src="/vid.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-white text-lg leading-relaxed md:leading-relaxed">
            شكون ال <span className="text-[#FBA705] font-semibold">Hive Club</span> ؟؟ كيما إسمها Hive &quot; خلية &quot; و Team تحب إطور و تتطور، بدأت تنشط في ال
            <span className="text-[#FBA705] font-semibold"> Problem solving </span> و ال
            <span className="text-[#FBA705] font-semibold"> Competitive programming </span> مبعد زدنا ال
            <span className="text-[#FBA705] font-semibold"> Web development </span>.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-around gap-8 md:gap-20">
          <p className="text-white text-lg leading-relaxed md:leading-relaxed">
            شكون ال <span className="text-[#FBA705] font-semibold">Hive Club</span> ؟؟ كيما إسمها Hive &quot; خلية &quot; و Team تحب إطور و تتطور، بدأت تنشط في ال
            <span className="text-[#FBA705] font-semibold"> Problem solving </span> و ال
            <span className="text-[#FBA705] font-semibold"> Competitive programming </span> مبعد زدنا ال
            <span className="text-[#FBA705] font-semibold"> Web development </span>.
          </p>
          <div className="relative pr-6">
            <Image
              src="/whoIs.jpg"
              className="h-auto w-auto relative z-20 ml-4 mr-8 rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 shadow-lg"
              alt="Hive Club Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}