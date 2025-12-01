"use client";

import SponsorCard from "@/components/SponsorCard";
import ContactForm from "@/components/ContactForm";
import { useTheme } from "@/components/ThemeProvider";

export default function Sponsors() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)]' : 'bg-gradient-to-br from-gray-300 via-gray-200 to-slate-100'}`}>
      {/* Hero Section */}
      <div className="relative md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center pt-8 md:pt-0">
          <p className={`text-sm md:text-base font-bold mb-3 tracking-widest uppercase ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>Ontario Tech Racing</p>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Sponsors & Donors
          </h1>
          <div className={`w-24 md:w-32 h-1 mb-6 md:mb-8 mx-auto rounded-full ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8]'}`}></div>
          <p className={`text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Sponsoring Ontario Tech Racing means supporting the next generation of engineers and innovators. Your support directly contributes to real-world learning experiences and cutting-edge automotive technology for our 70 Engineering and Business students.
          </p>
          <p className={`text-sm md:text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Want to join us? Email us at{" "}
            <a className={`font-semibold transition-colors underline ${isDark ? 'text-orange-500 hover:text-orange-400' : 'text-[#48B4FF] hover:text-[#3AA0E8]'}`} href="mailto:motorsports@ontariotechu.net">
              motorsports@ontariotechu.net
            </a>
          </p>
          <button
            onClick={scrollToContact}
            className={`px-8 py-3 cursor-pointer rounded-full text-base md:text-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 shadow-lg hover:scale-105 ${
              isDark 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25' 
                : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8] text-white hover:from-[#3AA0E8] hover:to-[#2E90D8] hover:shadow-[#48B4FF]/25'
            }`}
          >
            <span>Become a Sponsor</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sponsor Tiers */}
      <div className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          
          {/* Diamond Tier */}
          <section className="relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10 mt-6 md:mt-0">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#0078ca]"></div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0078ca]">Diamond</h2>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#0078ca]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <SponsorCard logo="/sponsor_logos/otu-logo.png" name="Ontario Tech University" tier="diamond" url="https://ontariotechu.ca/" />
              <SponsorCard logo="/sponsor_logos/ACE_logo.png" name="ACE" tier="diamond" url="https://ontariotechu.ca/about/campus-buildings/north-oshawa/ace.php" />
            </div>
          </section>

          {/* Platinum Tier */}
          <section className="relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#E5E4E2]"></div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#E5E4E2]">Platinum</h2>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#E5E4E2]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <SponsorCard logo="/sponsor_logos/multimatic_Logo.png" name="Multimatic" tier="platinum" url="https://www.multimatic.com/" />
              <SponsorCard logo="/sponsor_logos/source_pmm.png" name="Source PMM" tier="platinum" url="https://www.sourcepmm.com/" />
            </div>
          </section>

          {/* Gold Tier */}
          <section className="relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#FFD700]"></div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFD700]">Gold</h2>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#FFD700]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:gap-6">
              <SponsorCard logo="/sponsor_logos/batemo_Logo_gold.png" name="Batemo" tier="gold" url="https://www.batemo.com/" />
              <SponsorCard logo="/sponsor_logos/cadence_Logo_gold.png" name="Cadence" tier="gold" url="https://www.cadence.com/en_US/home.html" />
              <SponsorCard logo="/sponsor_logos/lemo_Logo_gold.png" name="Lemo" tier="gold" url="https://www.lemo.com/en" />
              <SponsorCard logo="/sponsor_logos/Michiganwhite_Logo_gold.png" name="Michigan Scientific" tier="gold" url="https://www.michsci.com/" />
              <SponsorCard logo="/sponsor_logos/esab_Logo_gold.png" name="ESAB" tier="gold" url="https://esab.com/ca/nam_en/" />
              <SponsorCard logo="/sponsor_logos/Mach2_Logo_gold.png" name="Mach2" tier="gold" url="https://www.mach2waterjet.ca/" />
            </div>
          </section>

          {/* Silver Tier */}
          <section className="relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#C0C0C0]"></div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#C0C0C0]">Silver</h2>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#C0C0C0]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:gap-6">
              <SponsorCard logo="/sponsor_logos/vi-grade_Logo_silver.png" name="VI-Grade" tier="silver" url="https://www.vi-grade.com/" />
              <SponsorCard logo="/sponsor_logos/Sunstone_Logo_silver.png" name="Sunstone" tier="silver" url="https://www.sunstonewelders.com/" />
              <SponsorCard logo="/sponsor_logos/Genehas_Logo_silver.png" name="Gene Haas Foundation" tier="silver" url="https://www.ghaasfoundation.org/" />
              <SponsorCard logo="/sponsor_logos/tasking_Logo_silver.png" name="Tasking" tier="silver" url="https://www.tasking.com/" />
              <SponsorCard logo="/sponsor_logos/swagelok_Logo_silver.png" name="Swagelok" tier="silver" url="https://www.swagelok.com/en" />
              <SponsorCard logo="/sponsor_logos/tailscale_Logo_silver.png" name="Tailscale" tier="silver" url="https://tailscale.com/" />
            </div>
          </section>

          {/* Bronze Tier */}
          <section className="relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#CD7F32]"></div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#CD7F32]">Bronze</h2>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#CD7F32]"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5">
              <SponsorCard logo="/sponsor_logos/mtb_Logo_bronze.png" name="MTB" tier="bronze" url="https://mtbtransitsolutions.com/" />
              <SponsorCard logo="/sponsor_logos/kvaser_Logo_bronze.png" name="Kvaser" tier="bronze" url="https://kvaser.com/" />
              <SponsorCard logo="/sponsor_logos/rapidHarness_Logo_bronze.png" name="Rapid Harness" tier="bronze" url="https://rapidharness.com/" />
              <SponsorCard logo="/sponsor_logos/fiberglass_Unlimited_Logo_bronze.png" name="Fiberglass Unlimited" tier="bronze" url="https://www.fiberglassunlimited.ca/" />
              <SponsorCard logo="/sponsor_logos/PCB_Libraries_Logo_bronze.png" name="PCB Libraries" tier="bronze" url="https://www.pcblibraries.com/" />
              <SponsorCard logo="/sponsor_logos/bender_Logo_bronze.png" name="Bender" tier="bronze" url="https://www.bender.de/en/" />
              <SponsorCard logo="/sponsor_logos/marple_Logo_bronze.png" name="Marple" tier="bronze" url="https://www.marpledata.com/" />
              <SponsorCard logo="/sponsor_logos/guyaki_Logo_bronze.png" name="Guayaki" tier="bronze" url="https://guayaki.com/" />
              <SponsorCard logo="/sponsor_logos/altair_logo_bronze.png" name="Altair" tier="bronze" url="https://altair.com/" />
              <SponsorCard logo="/sponsor_logos/dana_Logo_bronze.png" name="Dana TM4" tier="bronze" url="https://www.danatm4.com/" />
              <SponsorCard logo="/sponsor_logos/steer_group_Logo_bronze.png" name="STEER Group" tier="bronze" url="https://engineering.ontariotechu.ca/steer/index.php" />
            </div>
          </section>

          {/* General Tier */}
          <section className="relative">
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gray-500"></div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-400">General</h2>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gray-500"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5">
              <SponsorCard logo="/sponsor_logos/united401_Logo_general.png" name="UA Local 401" tier="general" url="https://www.ualocal401.ca/" />
              <SponsorCard logo="/sponsor_logos/digikey_Logo_general.png" name="DigiKey" tier="general" url="https://www.digikey.ca/" />
            </div>
          </section>

        </div>
      </div>

      {/* Contact Form Section */}
      <div className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
