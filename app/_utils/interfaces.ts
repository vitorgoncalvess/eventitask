export interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  subtasks: number;
  tags: any[];
  tags_id: any[];
  subtasks_status: string[];
  fibonacci: number;
  priority: number;
  status: number;
  time: number;
  data_estimada: string;
  resp: [];
  responsaveis: [];
}

export type Dash = {
  name?: string;
  kpis?: {
    title: string;
    subtitle: string;
    value: number;
    info: string;
  }[];
  sections?: {
    board_id: number;
    id: number;
    name: string;
    tarefas_concluidas: number;
    total_tarefas: number;
  }[];
};
