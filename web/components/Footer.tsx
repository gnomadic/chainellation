import Image from "next/future/image";
import lightshadow from "../images/new/lightshadow.svg";
import blueshadow from "../images/new/blueshadow.svg";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { NavItems } from "../domain/Nav";

export default function Footer() {
  return (
    <footer className="relative font-roboto ">
      <div className="px-6 pb-12 mx-auto py-36 max-w-7xl lg:px-12 xl:px-6 2xl:px-0">
        <div className="space-y-8 md:space-y-12">
          {/* <Link
              href="/"
              className="text-2xl font-light tracking-widest text-white"
            >
              <Image
                className="w-auto h-8 brightness-200"
                src="/favicon.ico"
                alt="logo mark"
                width="100"
                height="100"
              />
            </Link> */}
          <nav>
            <ul className="flex flex-wrap gap-8 tracking-wider uppercase text-md text-offwhite">
              {/* <li>
                <Link href="/">
                  <div className="relative cursor-pointer">Home</div>
                </Link>
              </li> 
              <div className="border-r-2 border-offwhite" />*/}
              {process.env.NEXT_PUBLIC_IN_DEV === "true" ? (
                <>
                  {NavItems.map((element, i) => {
                    return (
                      <>
                        <li key={i}>
                          <Link href={element.href}>
                            <div className="relative cursor-pointer">
                              {element.label}
                            </div>
                          </Link>
                        </li>
                        <div className="border-r-2 border-offwhite" />
                      </>
                    );
                  })}
                  {/* <li>
                    <Link href="/nightsky">
                      <div className="cursor-pointer relative before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                        Night Skies
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/starships">
                      <div className="cursor-pointer relative before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                        Star Ships
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/explore">
                      <div className="cursor-pointer relative before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                        Explore
                      </div>
                    </Link>
                  </li> */}
                </>
              ) : (
                <>
                  <li>
                    <Link href="/inprogress">
                      <div className="cursor-pointer relative before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                        In Progress
                      </div>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.twomoons.app"
                >
                  <div className="cursor-pointer relative before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                    Whitepaper{" "}
                    <ArrowUpRightIcon
                      className="w-4 h-4 mb-1 -ml-1"
                      style={{ display: "inline" }}
                    />
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex flex-wrap justify-between gap-3"></div>
        </div>
      </div>
    </footer>
  );
}
