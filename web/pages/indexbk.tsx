import type { NextPage } from "next";
import Image from "next/future/image";
import Hero from "../components/index/Hero";
import CTA from "../components/index/CTA";
import Features from "../components/index/Features";
import Social from "../components/Social";
import stars from "../images/designed/stars.svg";
import Timeline from "../components/index/Timeline";
import ProjectDetails from "../components/index/ProjectDetails";

const Home: NextPage = (props: any) => {
  console.log("props: " + JSON.stringify(props));

  return (
    <section>
      <main className="relative pt-0 md:pt-24 background ">
        <section
          id="home"
          className="relative flex items-center md:min-h-[50%] min-w-screen"
        >
          <Image
            src="/bigsky.svg"
            className="fixed inset-0 object-cover w-full h-full"
            alt="night sky"
            width="4160"
            height="6240"
          />
          <div className="absolute z-0 w-screen mt-96">
            <Image
              width={100}
              height={100}
              src={stars}
              alt="header bg"
              className="w-screen"
            />
          </div>
        </section>
        <Hero />
        <CTA />
        <div
          aria-hidden="true"
          className="relative inset-0 z-0 pt-24 min-w-max bg-gradient-to-b from-clearslate/0 via-clearslate/50 to-clearslate"
        />

        <Features />

        {/* <Timeline /> */}
        <ProjectDetails />
        <div
          aria-hidden="true"
          className="pt-24 relative min-w-max inset-0 z-[1] bg-gradient-to-b from-clearslate via-clearslate/50 to-clearslate/0"
        />
        <Social />
      </main>
    </section>
  );
};

export default Home;
