import SponsorCard from "@/components/SponsorCard";

export default function Sponsors() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-6xl text-center">
        <p className="text-orange-500 text-lg font-bold mb-2 tracking-wide">Ontario Tech Racing</p>
        <h1 className="text-white text-6xl font-bold mb-4">Sponsors & Donors</h1>
        <div className="w-56 h-1 bg-orange-500 mb-8 mx-auto"></div>
        <p className="text-white text-base leading-relaxed mb-8">
          Sponsoring The Ontario Tech Racing means supporting the next generation of engineers and innovators. Your support directly contributes to real-world learning experiences, and cutting-edge automotive technology for our 70 Engineering and Business students. With your gracious support, your brand will also gain prominent exposure on our vehicle, merchandise, social media, and at high-profile events. Join us on this journey to an electric future and help drive innovation forward!
        </p>
        <p className="text-white text-lg mb-8">
          Want to join us at OTRacing? Email us at <a className="font-bold underline" href="mailto:motorsports@ontariotechu.net">motorsports@ontariotechu.net</a>
        </p>
        <button className="bg-orange-500 text-white px-8 py-3 hover:bg-orange-600 cursor-pointer rounded-full border-white border-2 text-lg font-semibold inline-flex items-center gap-2 transition-colors mb-8">
          Become a Sponsor
        </button>

        {/* Sponsor Cards Grid */}
        <div className="mt-12 space-y-16">
          {/* Diamond Tier */}
          <div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-[0.8px] w-10 bg-[#0078ca]"></div>
              <h2 className="text-4xl font-bold text-white">Diamond</h2>
              <div className="h-[0.8px] w-10 bg-[#0078ca]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <SponsorCard logo="/sponsor_logos/otu-logo.png" name="Ontario Tech Racing" tier="diamond" />
              <SponsorCard logo="/sponsor_logos/ACE_logo.png" name="Abbott" tier="diamond" />
            </div>
          </div>

          {/* Platinum Tier */}
          <div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-[0.8px] w-10 bg-[#E5E4E2]"></div>
              <h2 className="text-4xl font-bold text-white">Platinum</h2>
              <div className="h-[0.8px] w-10 bg-[#E5E4E2]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
            <SponsorCard logo="/sponsor_logos/multimatic_Logo.png" name="Emerson" tier="platinum" />
            <SponsorCard logo="/sponsor_logos/source_pmm.png" name="Canada" tier="platinum" />
            </div>
          </div>

          {/* Gold Tier */}
          <div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-[0.8px] w-10 bg-[#FFD700]"></div>
              <h2 className="text-4xl font-bold text-white">Gold</h2>
              <div className="h-[0.8px] w-10 bg-[#FFD700]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
            </div>
          </div>

          {/* Silver Tier */}
          <div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-[0.8px] w-10 bg-[#C0C0C0]"></div>
              <h2 className="text-4xl font-bold text-white">Silver</h2>
              <div className="h-[0.8px] w-10 bg-[#C0C0C0]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
            </div>
          </div>

          {/* Bronze Tier */}
          <div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-[0.8px] w-10 bg-[#CD7F32]"></div>
              <h2 className="text-4xl font-bold text-white">Bronze</h2>
              <div className="h-[0.8px] w-10 bg-[#CD7F32]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Example: <SponsorCard logo="/sponsors/example-logo.png" name="Company Name" tier="bronze" /> */}
            </div>
          </div>

          {/* General Tier */}
          <div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-[0.8px] w-10 bg-gray-400"></div>
              <h2 className="text-4xl font-bold text-white">General</h2>
              <div className="h-[0.8px] w-10 bg-gray-400"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}