import SimboloBandera from "./Simbolo_Bandera.svg";

const Flag = (
  <>
    <span className="w-16 h-8 bg-[#006847]"></span>

    <span className="w-16 h-8 bg-white border-2 border-black flex items-center justify-center relative overflow-hidden">
      <img src={SimboloBandera} alt="Bandera de México" className="w-10 h-auto" />
    </span>

    <span className="w-16 h-8 bg-[#CE1126]"></span>
  </>
);

export default Flag;