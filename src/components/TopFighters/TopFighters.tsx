import type {  topFightersType } from "../../types/fighterType";
import FighterCard from "./FighterCard";

const topFightersData = ({ title, topFightersData, setSelectedFighter }: topFightersType) => {
  return (
    <section className="mb-20" >
      <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {topFightersData[0] && <FighterCard boxer={topFightersData[0]} rank={1} setSelectedFighter={setSelectedFighter} />}
        </div>
        <div className="md:col-span-1">
          {topFightersData[1] && <FighterCard boxer={topFightersData[1]} rank={2} setSelectedFighter={setSelectedFighter} />}
        </div>
        {topFightersData.slice(2).map((b, i) => (
          <FighterCard key={b.id} boxer={b} rank={i + 3} setSelectedFighter={setSelectedFighter} />
        ))}
      </div>
    </section>
  );
};
export default topFightersData;
