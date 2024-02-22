import {Assignement} from "./assignment.model";
import {Classroom} from "./classroom.model";
import {Task} from "./task.model";


export type Course = {
  id: string;
  name: string;
  content: string;
  practices: Assignement[];
  tasks: Task[];
  class: Classroom;
};
export type CreateCourse = {
  name: string;
  content: string;
};
export type UpdateCourse = Partial<CreateCourse>;
