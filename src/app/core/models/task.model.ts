import {Student} from "./user.model";
import {Course} from "./course.model";

export type Task = {
  id: string;
  name: string;
  content: string;
  points: number;
  course: Course;
  responseTasks: ResponseTask[];
};
export type ResponseTask = {
  id: string;
  completed: boolean;
  task: Task;
  student: Student;
};
export type CreateTask = {
  name: string;
  content: string;
  points: number;
};
export type UpdateTask = Partial<CreateTask>;
