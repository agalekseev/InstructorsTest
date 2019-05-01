import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Instructor } from '../Model/Instructor';

@Component({
  selector: 'instructor-edit-component',
  templateUrl: './instructor.edit.component.html'
})
export class InstructorEditComponent {
  @Input() instructor: Instructor;
  @Input() isLoading: boolean;
  @Output("instructorSaved") onInstructorSaved: EventEmitter<Instructor>;

  constructor() {
    this.onInstructorSaved = new EventEmitter();
  }

  public AddUpdateInstructor(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    var instructor = new Instructor(form.value.idValue, form.value.firstName, form.value.lastName);
    this.onInstructorSaved.emit(instructor);
  }

}
