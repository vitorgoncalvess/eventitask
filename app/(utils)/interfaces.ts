export interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  subtasks: number;
  tags: any[];
  subtasks_status: string[];
  fibonacci: number;
  priority: number;
  status: number;
  time: number;
  data_estimada: string;
  resp: [];
  responsaveis: [];
}
