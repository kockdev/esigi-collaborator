import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface education {
  schooling: string;
  situation: string;
  course: string;
  institution: string;
}

const ELEMENT_DATA: education[] = [
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
];

@Component({
  selector: 'app-collaborator-education-tab',
  templateUrl: './collaborator-education-tab.component.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorEducationTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['schooling', 'situation', 'course', 'institution'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }
}
