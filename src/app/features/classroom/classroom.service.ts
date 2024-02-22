import {Injectable} from '@angular/core';
import {Classroom, CreateClassroom, UpdateClassroom} from "@core/models/classroom.model";
import {Course} from "@core/models/course.model";
import {Assignement} from "@core/models/assignment.model";
import {Student, Teacher} from "@core/models/user.model";
import {Task} from "@core/models/task.model";
import {ApiService} from "@core/services/api.service";

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  constructor(private api: ApiService) {}
  // Classroom
  getClassrooms(query?: string) {
    if (!query || query==="") return this.api.get<Classroom[]>(`/classroom`);
    return this.api.get<Classroom[]>(`/classroom?query=${query}`);
  }
  addClassroom(classroom: CreateClassroom, id: string) {
    return this.api.post<Classroom>(`/classroom/${id}`, classroom);
  }
  getClassroom(id: string) {
    return this.api.get<Classroom>(`/classroom/${id}`);
  }
  updateClassroom(id: string, classroom: UpdateClassroom) {
    return this.api.patch<Classroom>(`/classroom/${id}`, classroom).subscribe();
  }
  deleteClassroom(id: string) {
    return this.api.remove(`/classroom/${id}`);
  }

  // Course
  getCourses(classroom_id: string) {
    return this.api.get<Course[]>(`/classroom/course/${classroom_id}`);
  }
  // Task
  getTasks(classroom_id: string, status?: 'completed' | 'inProgress') {
    return this.api.get<Task[]>(`/classroom/task/${classroom_id}?status=${status}`);
  }
  // Assignment
  getAssignments(classroom_id: string) {
    return this.api.get<Assignement[]>(`/classroom/assignment/${classroom_id}`);
  }
  // User
  getUsers(classroom_id: string) {
    return this.api.get<{teacher:Teacher,students:Student[]}>(`/classroom/users/${classroom_id}`);
  }
  addStudent(classroom_id: string, email: string) {
    return this.api.patch<Student>(`/classroom/${classroom_id}/${email}`, {email})
  }
}
