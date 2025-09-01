interface HeaderTitleProps {
  flag: React.ReactNode;
  title: string;
}

const HeaderTitle = ({ flag, title }: HeaderTitleProps) => {
  return (
    <>
      <header className="text-center mb-6">
        <div className="flex justify-center items-center space-x-4 mt-1 mb-4">
          {flag}
        </div>
        <h1 className="title-massive fc-primary-dark pt-2 uppercase">
          {title}
        </h1>
      </header>
      <div id="target-scroll"></div>
    </>
);
};

export default HeaderTitle;
