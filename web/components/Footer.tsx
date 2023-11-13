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
          <nav>
            <ul className="flex flex-wrap gap-8 tracking-wider uppercase text-md text-offwhite">
              <li>
                <Link href="/">
                  <div className="relative cursor-pointer">Home</div>
                </Link>
              </li>
              <div className="border-r-2 border-offwhite" />

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

              <li>
                <a
                  href="https://twitter.com/twomoonsthegame"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="relative cursor-pointer">twitter</div>
                </a>
              </li>
              <div className="border-r-2 border-offwhite" />

              <li>
                <a
                  href="https://discord.com/invite/ZrpWd3ZyeJ"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="relative cursor-pointer">discord</div>
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
