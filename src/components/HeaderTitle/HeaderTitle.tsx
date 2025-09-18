const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <>
      <header className="text-center header-title ">
        <h1 className="title-main fc-primary-dark pt-2 uppercase">{title}</h1>
      </header>
      <div id="target-scroll"></div>
    </>
  );
};

export default HeaderTitle;
