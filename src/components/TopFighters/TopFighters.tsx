import type { fighterType } from "../../types/fighterType";
import FighterCard from "./FighterCard";

interface TopFightersProps {
  title: string;
  topFightersData: fighterType[];
  onFighterSelect: (fighter: fighterType) => void;
}

const TopFighters = ({ title, topFightersData, onFighterSelect }: TopFightersProps) => {
  return (
    <section className="mb-40">
      <h2 className="title-1 color-primary-dark text-5xl md:text-7xl uppercase mb-10 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {topFightersData[0] && (
            <FighterCard
              boxer={topFightersData[0]}
              rank={1}
              onSelect={onFighterSelect}
            />
          )}
        </div>
        <div className="md:col-span-1">
          {topFightersData[1] && (
            <FighterCard
              boxer={topFightersData[1]}
              rank={2}
              onSelect={onFighterSelect}
            />
          )}
        </div>
        {topFightersData.slice(2).map((b, i) => (
          <FighterCard
            key={b.id}
            boxer={b}
            rank={i + 3}
            onSelect={onFighterSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default TopFighters;
