import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { NavItems } from "../domain/Nav";
import { Address, Deployment } from "../domain/Domain";
import useDeployment from "../hooks/useDeployment";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { deploy } = useDeployment();

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="absolute top-0 z-50 w-full font-kdam">
      <nav className="px-6 pt-4 pb-12 mx-auto md:pt-8 lg:px-12 xl:px-6">
        <div className="flex items-center justify-between text-offwhite">
          <div className="items-center flex-shrink-0 gap-3 p-2 ">
            <Link href="/">
              <div className="text-3xl font-bold leading-loose text-white cursor-pointer uppercase">
                {deploy.displayName}
              </div>
            </Link>
          </div>

          <nav>
            <ul className="hidden tracking-wider uppercase lg:gap-8 lg:flex-wrap lg:flex text-md text-offwhite">
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
                    {i == NavItems.length - 1 ? (
                      <></>
                    ) : (
                      <div className="border-r-2" />
                    )}
                  </>
                );
              })}

              {/* <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.twomoons.app"
                >
                  <div className="relative cursor-pointer">
                    Whitepaper
                    <ArrowUpRightIcon
                      className="w-4 h-4 mb-1 -ml-1"
                      style={{ display: "inline" }}
                    />
                  </div>
                </a>
              </li> */}
            </ul>
          </nav>
          <div className="flex">
            <div className="self-center lg:hidden">
              <button
                onClick={() => {
                  handleMobileNavClick();
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="6" width="24" height="2" fill="white"></rect>
                  <rect y="11" width="24" height="2" fill="white"></rect>
                  <rect y="16" width="24" height="2" fill="white"></rect>
                </svg>
              </button>
              {isMobileNavOpen ? (
                <>
                  <MobileNav onClick={handleMobileNavClick} />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="relative py-1.5 text-offwhite hidden lg:block">
              <ConnectButton
                chainStatus="icon"
                accountStatus="address"
                showBalance={false}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
