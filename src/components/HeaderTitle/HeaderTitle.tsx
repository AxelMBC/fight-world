const HeaderTitle = () => {
  return (
    <header className="text-center mb-6">
      <div className="flex justify-center items-center space-x-4 mt-1 mb-4">
        <span className="w-16 h-8 bg-[#006847]"></span>
        <span className="w-16 h-8 bg-white border-2 border-black"></span>
        <span className="w-16 h-8 bg-[#CE1126]"></span>
      </div>
      <h1 className="pt-2 text-6xl md:text-8xl font-anton uppercase text-stroke">
        Boxeo al Estilo <span className="text-stroke-red">MEXICANO</span>
      </h1>
    </header>
  );
};

export default HeaderTitle;
