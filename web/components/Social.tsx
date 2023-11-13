import socialx from "../../images/social/social-x.svg";
import socialdiscord from "../../images/social/social-discord.svg";
import socialgitbook from "../../images/social/social-gitbook.svg";
import Image from "next/future/image";

export default function Social() {
  return (
    <section>
      <section className="relative z-10 pt-32">
        <div className="relative">
          <div className="text-4xl font-normal leading-normal text-center text-offwhite font-arb">
            Follow us
          </div>
          <div className="w-20 mx-auto h-[0px] border-2 border-boldorange mb-12"></div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center flex-grow-0 flex-shrink-0 gap-3 p-4 rounded-full bg-boldorange">
            <a
              href="https://twitter.com/twomoonsthegame"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image width={50} height={50} src={socialx} alt="logo" />
            </a>
            <a
              href="https://discord.com/invite/ZrpWd3ZyeJ"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image width={50} height={50} src={socialdiscord} alt="logo" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.twomoons.app"
            >
              <Image
                className=""
                width={50}
                height={50}
                src={socialgitbook}
                alt="logo"
              />
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
