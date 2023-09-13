import card from "@/public/card.svg";
import clock from "@/public/clock.svg";
import people from "@/public/people.svg";
import settings from "@/public/settings.svg";
import cardWhite from "@/public/cardWhite.svg";
import clockWhite from "@/public/clockWhite.svg";
import peopleWhite from "@/public/peopleWhite.svg";
import settingsWhite from "@/public/settingsWhite.svg";

const strings = {
  TABLE: ["Feito", "Tarefa", "Prazo", "Status", "Tags"],
  DASHSIDEPURPLE: [
    {
      img: card,
      label: "Seções",
      selected: cardWhite,
      path: "/areas",
    },
    {
      img: clock,
      label: "Registro",
      selected: clockWhite,
      path: "/registros",
    },
    {
      img: people,
      label: "Responsaveis",
      selected: peopleWhite,
      path: "/responsaveis",
    },
  ],
  DASHSIDERED: [
    {
      img: settings,
      label: "Configuração",
      selected: settingsWhite,
      path: "/config",
    },
  ],
};

export default strings;
