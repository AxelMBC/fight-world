import type { fighterType } from "../../../types/fighterType";

interface FighterCardProps {
  boxer: fighterType;
  rank: number;
  onSelect: (fighter: fighterType) => void;
}

const FighterCard = ({ boxer, rank, onSelect }: FighterCardProps) => {
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => onSelect(boxer)}
    >
      <div className="relative bg-white border-4 border-black shadow-[10px_10px_0_#000] group-hover:shadow-[12px_12px_0_#ca2626] transition-all duration-200">
        <div className="absolute top-0 left-0 bg-black fc-white font-anton text-5xl px-3 z-10">
          #{rank}
        </div>
        <div className="overflow-hidden">
          <img
            src={boxer.image}
            alt={boxer.name}
            className="w-full h-80 object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="p-5 border-t-4 border-black">
          <h3 className="font-anton text-3xl uppercase fc-black truncate">
            {boxer.name}
          </h3>
          <p className="mt-1 text-md fc-gray font-mono">
            RÉCORD: {boxer.record}
          </p>
          <p className="mt-2 fc-primary font-bold uppercase">
            {boxer.achievements}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FighterCard;
