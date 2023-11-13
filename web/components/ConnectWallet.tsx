import type { NextPage } from "next";
import Image from "next/future/image";
import concept from "../images/concept.webp";
import socialx from "../images/social/social-x.svg";
import socialdiscord from "../images/social/social-discord.svg";
import socialgitbook from "../images/social/social-gitbook.svg";

export default function ConnectWallet() {
  return (
    <section>
      <main className="relative background ">
        <section
          id="inprogress"
          className="relative items-center min-h-screen pt-48"
        >
          <Image
            src="/bigsky.svg"
            className="fixed inset-0 object-cover w-full h-full"
            alt="night sky"
            width="4160"
            height="6240"
          />
          <div className="border-boldorange border-[8px] rounded-lg mx-2 z-10 relative">
            <div className="bg-[#98161D] mx-auto   text-[#F5DFB3] py-4 text-lg  text-center font-bold">
              <p className="md:text-9xl text-6xl font-jost uppercase text-[#F5DFB3] py-12">
                Connect Wallet
              </p>
            </div>
            <div className="border-4 border-boldorange" />

            <div className="bg-[#0a0a0abf] pt-4 ">
              <div className="p-2 md:p-24">
                <Image
                  width={1024}
                  height={512}
                  src={concept}
                  alt="logo"
                  className="border-boldorange rounded-lg border-[4px] mx-auto"
                />
                <div className="grid grid-cols-2 gap-8 pt-12 md:pt-20">
                  <p className="mb-20 text-lg font-light ml-2 text-[#F5DFB3] sm:text-2xl xl:leading-normal">
                    Connect your Wallet to explore the solar system.
                  </p>
                  <ul className="ml-4">
                    <a
                      href="https://twitter.com/twomoonsthegame"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex pb-8"
                    >
                      <Image width={30} height={30} src={socialx} alt="logo" />
                      <p className="text-[#F5DFB3] pl-2">X</p>
                    </a>
                    <a
                      href="https://discord.com/invite/ZrpWd3ZyeJ"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex pb-8"
                    >
                      <Image
                        width={30}
                        height={30}
                        src={socialdiscord}
                        alt="logo"
                      />
                      <p className="text-[#F5DFB3] pl-2">Discord</p>
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.twomoons.app"
                      className="flex"
                    >
                      <Image
                        className=""
                        width={30}
                        height={30}
                        src={socialgitbook}
                        alt="logo"
                      />
                      <p className="text-[#F5DFB3] pl-2">Whitepaper</p>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
