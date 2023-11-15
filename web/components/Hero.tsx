import Image from "next/future/image";
import explorethestars from "../images/designed/explorethestars.svg";
import rocket from "../images/designed/rocket.svg";
import planetblue from "../images/designed/planetblue.svg";

export default function Hero() {
  return (
    <section id="home" className="relative z-30 items-center min-w-screen">
      <div className="w-screen px-10 pt-80">
        <Image
          width={100}
          height={100}
          src={explorethestars}
          alt="header bg"
          className="w-screen"
        />
      </div>
      {/* 
      <div className="pt-12 text-5xl font-normal text-center text-offwhite font-arb">
        Blockchain Space
        <br />
        Game
      </div> */}

      <div className="absolute left-0 z-40 top-5/8">
        <Image width={100} height={100} src={planetblue} alt="rings" />
      </div>

      <div className="absolute top-0 right-0 ">
        <Image width={400} height={400} src={rocket} alt="globe" />
      </div>
    </section>
  );
}
