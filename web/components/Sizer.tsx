export default function Sizer() {
  return (
    <>
      <p className="md:hidden">SM</p>
      <p className="hidden md:block lg:hidden">MD</p>
      <p className="hidden lg:block xl:hidden">LG</p>
      <p className="hidden xl:block ">XL</p>
    </>
  );
}
