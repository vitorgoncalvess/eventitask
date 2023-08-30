export interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  subtasks: number;
  fibonacci: number;
  priority: number;
  status: number;
  time: number;
  resp: [];
  responsaveis: [];
}
