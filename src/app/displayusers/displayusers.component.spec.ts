import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DisplayusersComponent } from './displayusers.component';
import { CrudlogicService, User } from '../crudlogic.service';

describe('DisplayusersComponent', () => {
  let component: DisplayusersComponent;
  let fixture: ComponentFixture<DisplayusersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayusersComponent, HttpClientTestingModule],
      providers: [CrudlogicService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayusersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    
    // Mock the initial HTTP call that happens in ngOnInit
    const mockUsers: User[] = [
      { id: 1, name: 'Test User', email: 'test@test.com', designation: 'Developer' }
    ];
    
    fixture.detectChanges();
    
    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush(mockUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('Test User');
    expect(component.loading).toBeFalse();
  });
});
