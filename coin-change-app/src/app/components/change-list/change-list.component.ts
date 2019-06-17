import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Change } from '../../models/change.model';

@Component({
  selector: 'app-change-list',
  templateUrl: './change-list.component.html',
  styleUrls: ['./change-list.component.scss']
})
export class ChangeListComponent {
  @Input() changeList: Observable<Array<Change>>;
}
