import type { fighterType } from "@/types/fighterType";
import JulioCesarImg from "../resources/Fighters/topFighterJulioCesar.avif";
import CaneloAlvarezImg from "../resources/Fighters/topFighterCaneloAlvarez.webp";
import SalvadorSanchezImg from "../resources/Fighters/SalvadorSanchez.jpg";

export const topFightersData: fighterType[] = [
  {
    id: "1",
    name: "Julio César Chávez",
    record: "107-6-2",
    nickName: "El Gran Campeón Mexicano",
    image: JulioCesarImg,
    fightsCounter: 5,
  },
  {
    id: "2",
    name: "Canelo Álvarez",
    record: "61-2-2",
    nickName: "Rey Indiscutido",
    image: CaneloAlvarezImg,
    fightsCounter: 5,
  },
  {
    id: "3",
    name: "Ricardo López",
    record: "51-0-1",
    nickName: "Finito, La Perfección",
    image:
      "https://www.infobae.com/resizer/v2/6AMVEHZNYVGHJGXDUVFYHCJNRQ.jpg?auth=673c35eeb291c91cd8d7928c4a4943f64ffe929c7200e7715ec93f8e4afd8155",
    fightsCounter: 5,
  },
  {
    id: "4",
    name: "Juan Manuel Márquez",
    record: "56-7-1",
    nickName: "Maestro del Contragolpe",
    image:
      "https://i0.wp.com/wbanews.com/wp-content/uploads/2013/01/Juan-Manuel-Marquez-dejo-a-Latinoamerica-en-lo-mas-alto.jpg",
    fightsCounter: 5,
  },
  {
    id: "5",
    name: "Salvador Sánchez",
    record: "44-1-1",
    nickName: "El Campeón Inmortal",
    image: SalvadorSanchezImg,
    fightsCounter: 5,
  },
];

export const boxersSearch = [
  {
    id: "1",
    name: "Julio César Chávez",
  },
  {
    id: "2",
    name: "Canelo Álvarez",
  },
  {
    id: "3",
    name: "Ricardo López",
  },
  {
    id: "4",
    name: "Juan Manuel Márquez",
  },
  {
    id: "5",
    name: "Salvador Sánchez",
  },
  {
    id: 6,
    name: "Rubén 'Púas' Olivares",
  },
  {
    id: 7,
    name: "Érik 'El Terrible' Morales",
  },
  {
    id: 8,
    name: "Marco Antonio Barrera",
  },
  {
    id: 9,
    name: "Carlos Zárate",
  },
];
