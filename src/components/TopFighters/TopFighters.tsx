import FighterCard from "../FighterCard"
import { topBoxers } from "../../pages/countries/Mexico/data/topFighters";

const TopFighters = () => {
    return (
 <section className="mb-20">
            <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
              ÍDOLOS DE MÉXICO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {topBoxers[0] && <FighterCard boxer={topBoxers[0]} rank={1} />}
              </div>
              <div className="md:col-span-1">
                {topBoxers[1] && <FighterCard boxer={topBoxers[1]} rank={2} />}
              </div>
              {topBoxers.slice(2).map((b, i) => (
                <FighterCard key={b.id} boxer={b} rank={i + 3} />
              ))}
            </div>
          </section>
    )
}
export default TopFighters;