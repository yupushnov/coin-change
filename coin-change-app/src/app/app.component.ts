import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Change, ChangeRequest, ResponseError } from './models/change.model';
import { ChangeService } from './services/change.service';
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changeControl: FormControl = new FormControl();
  slideControl: FormControl = new FormControl();
  availableChange$: Observable<Array<Change>>;
  response: Array<Change> | null;
  responseError: ResponseError | null;
  isOptimalMode = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any,
    private changeService: ChangeService
  ) { }

  ngOnInit() {
    this.availableChange$ = this.changeService.getAvailableChange();

    if (!isPlatformBrowser(this.platformId)) {
        const bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
            bases[0].setAttribute('href', environment.baseHref);
        }
    }
}

  onChangeControlChange() {
    if (this.changeControl.value) {
      this.changeControl.setValue(Math.round(this.changeControl.value * 100) / 100);
    }
  }

  onSlideChange() {
    this.isOptimalMode = this.slideControl.value;
  }

  getChange() {
    this.response = null;
    this.responseError = null;
    const request: ChangeRequest = {
      euro: Math.round(this.changeControl.value * 100)
    };

    const response$ = this.isOptimalMode
      ? this.changeService.postOptimalChange(request)
      : this.changeService.postChange(request);

    response$
      .pipe(catchError(({ error }) => {
        this.responseError = error;
        return [];
      }))
      .subscribe(change => {
        this.response = change;
      });
  }
}
