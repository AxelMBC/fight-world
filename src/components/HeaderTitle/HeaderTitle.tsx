const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <>
      <header  id="target-scroll" className="text-center header-title ">
        <h1 className="title-main fc-primary-dark pt-2 uppercase">{title}</h1>
      </header>
      <div></div>
    </>
  );
};

export default HeaderTitle;
