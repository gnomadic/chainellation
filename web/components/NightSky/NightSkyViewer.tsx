import Image, { StaticImageData } from "next/future/image";

type NightSkyViewerProps = {
  onClick: () => void;
  image: string | StaticImageData;
};

export default function NightSkyViewer(props: NightSkyViewerProps) {
  return (
    <div className="fixed z-40 left-1/2 top-1/2">
      <div
        className="fixed inset-0 opacity-50 bg-slate navbar-backdrop"
        onClick={props.onClick}
      ></div>
      <div className="-translate-x-1/2 -translate-y-1/2 border-[8px] border-boldorange bg-slate min-w-5/6 min-h-5/6 p-6">
        <Image width={1024} height={1024} src={props.image} alt={"close up"} />

        {/* <nav className="relative flex flex-col w-full h-full px-10 py-8 overflow-y-auto border-r bg-slate">
          <Link href="/">
            <span className="inline-block mb-16 text-xl font-medium text-white font-heading">
              <Image width={45} height={45} src={logo} alt="logo" />
            </span>
          </Link>
          <ul className="mb-32 font-roboto">
            <li>
              <Link href="/nightsky">
                <div className="relative text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                  VIEW
                </div>
              </Link>
            </li>
            <li className="pt-8">
              <Link href="/nightsky">
                <div className="relative text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                  VIEW{" "}
                </div>
              </Link>
            </li>
            <li className="pt-8">
              <Link href="/nightsky">
                <div className="relative text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                  VIEW{" "}
                </div>
              </Link>
            </li>

            <li className="pt-8">
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
          <div className="flex items-center justify-center py-4 mb-8 duration-200 transform ">
            <ConnectButton />
          </div>
        </nav> */}
      </div>
    </div>
  );
}
