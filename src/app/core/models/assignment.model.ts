import {Student, Teacher} from "./user.model";

export type Assignement = {
  id: string;
  name: string;
  content: string;
  deadline: string;
  points: number;
  course: any;
  responseAssignments: ResponseAssignement[];
  teacher: Teacher;
};
export type ResponseAssignement = {
  id: string;
  content: string;
  score: number;
  assignment: Assignement;
  student: Student;
};
export type CreateAssignement = {
  name: string;
  content: string;
  deadline: string;
  points: number;
};
export type UpdateAssignement = Partial<CreateAssignement>;

export type UpdateResponseAssignement = {
  content: string;
};

export type ValidateResponseAssignement = {
  score: number;
};
