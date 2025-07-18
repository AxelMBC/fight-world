interface HeaderTitleProps {
  flag: React.ReactNode;
  title: string;
  style: string;
}

const HeaderTitle = ({ flag, title, style }: HeaderTitleProps) => {
  return (
    <>
      <header className="text-center mb-6">
        <div className="flex justify-center items-center space-x-4 mt-1 mb-4">
          {flag}
        </div>
        <h1 className="pt-2 text-6xl md:text-8xl font-anton uppercase text-stroke">
          {title}
          <span className="text-stroke-red"> {style}</span>
        </h1>
      </header>
      <div id="target-scroll"></div>
    </>
  );
};

export default HeaderTitle;
