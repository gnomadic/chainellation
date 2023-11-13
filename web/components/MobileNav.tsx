import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo-unopt.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { NavItems } from "../domain/Nav";

type MobileNavProps = {
  onClick: () => void;
};

export default function MobileNav(props: MobileNavProps) {
  return (
    <div className="fixed top-0 bottom-0 left-0 z-40 w-1/2 max-w-sm navbar-menu">
      <div
        className="fixed inset-0 opacity-50 bg-slate navbar-backdrop"
        onClick={props.onClick}
      ></div>
      <nav className="relative flex flex-col w-full h-full px-10 py-8 overflow-y-auto border-r bg-slate">
        <Link href="/">
          <span className="inline-block mb-16 text-xl font-medium text-white font-heading">
            <Image width={45} height={45} src={logo} alt="logo" />
          </span>
        </Link>
        <ul className="gap-8 tracking-wider uppercase b-32 font-roboto">
          {process.env.NEXT_PUBLIC_IN_DEV === "true" ? (
            <>
              {NavItems.map((element, i) => {
                return (
                  <>
                    <li key={i}>
                      <Link href={element.href}>
                        <div className="relative pb-8 cursor-pointer">
                          {element.label}
                        </div>
                      </Link>
                    </li>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <li className="pt-8">
                <Link href="/inprogress">
                  <div className="relative text-white ">In Progress</div>
                </Link>
              </li>
            </>
          )}
          <li className="">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.twomoons.app"
            >
              <div className="relative text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                Whitepaper
                <ArrowUpRightIcon
                  className="w-4 h-4 mb-1 -ml-1"
                  style={{ display: "inline" }}
                />
              </div>
            </a>
          </li>
        </ul>
        <div className="flex items-center justify-center py-4 pt-16 mb-8 duration-200 transform">
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}
