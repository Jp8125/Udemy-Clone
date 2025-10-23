import { Component } from '@angular/core';
import { Courses } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-nested-filter',
  templateUrl: './nested-filter.component.html',
  styleUrls: ['./nested-filter.component.css']
})
export class NestedFilterComponent {
  Filteredcourses: Array<Courses> = [];
}
