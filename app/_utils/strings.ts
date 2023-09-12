import home from "@/public/home.svg";
import card from "@/public/card.svg";
import clock from "@/public/clock.svg";
import homeWhite from "@/public/homeWhite.svg";
import cardWhite from "@/public/cardWhite.svg";
import clockWhite from "@/public/clockWhite.svg";

const strings = {
  TABLE: ["Feito", "Tarefa", "Prazo", "Status", "Tags"],
  DASHSIDE: [
    {
      img: home,
      label: "Home",
      selected: homeWhite,
      path: undefined,
    },
    {
      img: card,
      label: "Áreas",
      selected: cardWhite,
      path: "/areas",
    },
    {
      img: clock,
      label: "Registro",
      selected: clockWhite,
      path: "/registros",
    },
  ],
};

export default strings;
