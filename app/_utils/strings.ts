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
  OPTIONS: [
    {
      value: "Pendente",
      color: "bg-yellow-400 hover:bg-yellow-400",
      info: "Atividade está ociosa",
    },
    {
      value: "Em Desenvolvimento",
      color: "bg-blue-400 hover:bg-blue-400",
      info: "Atividade está sendo feita",
    },
    {
      value: "Concluido",
      color: "bg-emerald-400 hover:bg-emerald-400",
      info: "Atividade foi finalizada",
    },
  ],
};

export default strings;
