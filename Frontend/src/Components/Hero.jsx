import React, { useEffect } from "react";
import "../Style/Hero.css";

const Hero = () => {
  useEffect(() => {
    const openMenu = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");
    const navLinks = document.getElementById("mobile-navLinks");

    const openMenuHandler = () => {
      navLinks.classList.remove("-translate-x-full");
      navLinks.classList.add("translate-x-0");
    };

    const closeMenuHandler = () => {
      navLinks.classList.remove("translate-x-0");
      navLinks.classList.add("-translate-x-full");
    };

    openMenu?.addEventListener("click", openMenuHandler);
    closeMenu?.addEventListener("click", closeMenuHandler);

    // Cleanup listeners
    return () => {
      openMenu?.removeEventListener("click", openMenuHandler);
      closeMenu?.removeEventListener("click", closeMenuHandler);
    };
  }, []);

  return (
    <section className="flex flex-col items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat font-[Poppins,sans-serif]">
    

    

      {/* Mobile nav */}
     

      {/* Hero Section */}
      <main className="flex flex-col items-center max-md:px-2">
        <a
          href="https://prebuiltui.com"
          className="mt-32 flex items-center gap-2 border  rounded-full  text-sm font-medium text-indigo-500 "
        >
        
          <p className="flex items-center gap-1">
          
          </p>
        </a>

        <h1   data-aos="zoom-in" className="text-center text-4xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900 ">
           Discover Campus Opportunities & Connect with Talent

        </h1>
        <p className="text-center text-base text-slate-700 max-w-lg mt-2 "  data-aos="fade-up">
        CampusConnect helps students find jobs, academic projects, and collaboration opportunities
  while allowing talent seekers and finders to connect seamlessly.
        </p>

        <div className="flex items-center gap-4 mt-8"  data-aos="fade-up">
          <button className="flex items-center gap-2 bg-indigo-950 hover:bg-indigo-950 text-white active:scale-95 rounded-lg px-7 h-11">
            Get started
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-lg px-8 h-11">
              Browse Jobs
          </button>
        </div>

     
      </main>
    </section>
  );
};

export default Hero;
