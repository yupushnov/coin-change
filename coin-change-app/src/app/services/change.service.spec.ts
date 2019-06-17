import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ChangeService } from './change.service';

describe('ChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ChangeService = TestBed.get(ChangeService);
    expect(service).toBeTruthy();
  });
});
