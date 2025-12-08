const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <>
      <header  id="target-scroll" className="text-center header-title ">
        <h1 className="font-default section-spacing text-5xl md:text-8xl fc-primary-dark pt-2 uppercase mb-3">{title}</h1>
      </header>
      <div></div>
    </>
  );
};

export default HeaderTitle;
