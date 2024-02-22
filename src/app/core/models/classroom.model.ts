import {Student, Teacher} from "./user.model";

export type Classroom = {
  id: string;
  name: string;
  description: string;
  image: string;
  students: Student[];
  teacher: Teacher;
  courses: any[];
};
export type CreateClassroom = {
  name: string;
  description: string;
};
export type UpdateClassroom = Partial<CreateClassroom>;
