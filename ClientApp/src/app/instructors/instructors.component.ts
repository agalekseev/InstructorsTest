import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instructor } from '../Model/Instructor';

@Component({
  selector: 'instructors-component',
  templateUrl: './instructors.component.html'
})
export class InstructorsComponent implements OnInit {
  private instructors: Instructor[];
  private currentInstructor: Instructor;
  private isLoading: boolean;

  constructor(private http: HttpClient) {
    this.instructors = new Array<Instructor>();
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.http.get('/api/Instructors').subscribe(this.OnDataLoaded.bind(this), this.OnServerError.bind(this));
  }

  private OnDataLoaded(data: Instructor[]) {
    this.instructors = data;
    this.isLoading = false;
  }

  public onInstructorSelected(instructor: Instructor) {
    this.currentInstructor = instructor;
  }

  public onInstructorSaved(instructor: Instructor) {
    if (!instructor.id) {
      this.AddInstructor(instructor);
      return;
    }

    this.UpdateInstructor(instructor);
  }


  public onInstructorDeleted(instructor: Instructor) {
    this.isLoading = true;
    this.http.delete(`/api/Instructors/${instructor.id}`).subscribe(this.OnDeleted.bind(this), this.OnServerError.bind(this));
  }

  private OnDeleted(instructor: Instructor) {
    for (var i = 0; i < this.instructors.length; i++) {
      if (this.instructors[i].id === instructor.id) {
        this.instructors.splice(i, 1);
      }
    }
    this.isLoading = false;
  }

  private AddInstructor(instructor: Instructor) {
    this.isLoading = true;
    instructor.id = 0;
    this.http.post('/api/Instructors', instructor).subscribe(this.OnAddedInstructor.bind(this), this.OnServerError.bind(this));
  }

  private OnAddedInstructor(instructor: Instructor) {
    this.instructors.push(instructor);
    this.isLoading = false;
  }

  private UpdateInstructor(instructor: Instructor) {
    this.isLoading = true;
    this.http.put(`/api/Instructors/${instructor.id}`, instructor).subscribe(this.OnUpdatedInstructor.bind(this), this.OnServerError.bind(this));
  }


  private OnUpdatedInstructor(instructor: Instructor) {
    for (var i = 0; i < this.instructors.length; i++) {
      if (this.instructors[i].id === instructor.id) {
        this.instructors.splice(i, 1, instructor);
      }
    }

    this.isLoading = false;
  }

  private OnServerError(e) {
    alert(JSON.stringify(e));
    this.isLoading = false;
  }
}
