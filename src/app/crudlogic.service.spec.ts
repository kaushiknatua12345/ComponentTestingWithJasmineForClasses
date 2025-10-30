import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudlogicService, User } from './crudlogic.service';

describe('CrudlogicService', () => {
  let service: CrudlogicService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudlogicService]
    });
    service = TestBed.inject(CrudlogicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //create test for getUsers method
  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Test User 1', email: 'test1@test.com', designation: 'Developer' },
      { id: 2, name: 'Test User 2', email: 'test2@test.com', designation: 'Designer' }
    ];

    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should create a user', () => {
    const newUser: User = { name: 'New User', email: 'new@test.com', designation: 'Manager' };
    const createdUser: User = { id: 3, ...newUser };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe({
      next: (response) => {
        // DELETE operations typically return null or void
        expect(response).toBeNull();
      },
      error: () => {
        fail('Delete operation should not fail');
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
