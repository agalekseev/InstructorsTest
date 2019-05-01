import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Instructor } from '../Model/Instructor';

@Component({
  selector: 'instructor-list-component',
  templateUrl: './instructor.list.component.html'
})
export class InstructorListComponent {
  @Input() instructorList: Instructor[];
  @Input() isLoading: boolean;
  @Output("instructorSelected") onInstructorSelected: EventEmitter<Instructor>;
  @Output("instructorDeleted") onInstructorDeleted: EventEmitter<Instructor>;

  private currentInstructor: Instructor;

  constructor() {
    this.onInstructorSelected = new EventEmitter<Instructor>();
    this.onInstructorDeleted = new EventEmitter<Instructor>();
  }

  public InstructorSelected(instructor: Instructor) {
    this.currentInstructor = instructor;
    this.onInstructorSelected.emit(instructor);
  }

  public InstructorDeleted(instructor: Instructor, event: Event) {
    this.currentInstructor = null;
    this.onInstructorSelected.emit(null);
    this.onInstructorDeleted.emit(instructor);

    event.stopPropagation();
  }
}
