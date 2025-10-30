import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { UsersComponent } from './users.component';
import { User } from '../crudlogic.service';

// Interface definitions for testing
interface ContactForm {
  name: string;
  email: string;
  designation: string;
}

interface FormValidationErrors {
  required?: boolean;
  email?: boolean;
  minlength?: {
    requiredLength: number;
    actualLength: number;
  };
}

interface FormControlInterface {
  value: any;
  valid: boolean;
  invalid: boolean;
  errors: FormValidationErrors | null;
  touched: boolean;
  dirty: boolean;
  pristine: boolean;
  pending: boolean;
}

interface ComponentInterface {
  text: string;
  contactForm: any;
  contact: ContactForm;
  submitted: boolean;
  createForm(): void;
  onSubmit(): void;
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with correct default values', () => {
      expect(component.text).toBe('User Contact Form Example');
      expect(component.submitted).toBeFalse();
      expect(component.contact.name).toBe('');
      expect(component.contact.email).toBe('');
      expect(component.contact.designation).toBe('');
    });

    it('should create form with proper structure', () => {
      expect(component.contactForm).toBeDefined();
      expect(component.contactForm.get('name')).toBeDefined();
      expect(component.contactForm.get('email')).toBeDefined();
      expect(component.contactForm.get('designation')).toBeDefined();
    });

    it('should initialize form with empty values', () => {
      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('designation')?.value).toBe('');
    });
  });

  describe('Form Validation', () => {
    it('should be invalid when all fields are empty', () => {
      expect(component.contactForm.valid).toBeFalsy();
    });

    it('should be valid when all fields have valid values', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john.doe@example.com',
        designation: 'Developer'
      });
      expect(component.contactForm.valid).toBeTruthy();
    });

    describe('Name field validation', () => {
      it('should be invalid when name is empty', () => {
        const nameControl = component.contactForm.get('name');
        nameControl?.setValue('');
        nameControl?.markAsTouched();
        
        expect(nameControl?.valid).toBeFalsy();
        expect(nameControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when name is less than 4 characters', () => {
        const nameControl = component.contactForm.get('name');
        nameControl?.setValue('Jo');
        nameControl?.markAsTouched();
        
        expect(nameControl?.valid).toBeFalsy();
        expect(nameControl?.errors?.['minlength']).toBeTruthy();
      });

      it('should be valid when name is 4 or more characters', () => {
        const nameControl = component.contactForm.get('name');
        nameControl?.setValue('John');
        
        expect(nameControl?.valid).toBeTruthy();
        expect(nameControl?.errors).toBeNull();
      });
    });

    describe('Email field validation', () => {
      it('should be invalid when email is empty', () => {
        const emailControl = component.contactForm.get('email');
        emailControl?.setValue('');
        emailControl?.markAsTouched();
        
        expect(emailControl?.valid).toBeFalsy();
        expect(emailControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when email format is incorrect', () => {
        const emailControl = component.contactForm.get('email');
        emailControl?.setValue('invalid-email');
        emailControl?.markAsTouched();
        
        expect(emailControl?.valid).toBeFalsy();
        expect(emailControl?.errors?.['email']).toBeTruthy();
      });

      it('should be valid when email format is correct', () => {
        const emailControl = component.contactForm.get('email');
        emailControl?.setValue('john.doe@example.com');
        
        expect(emailControl?.valid).toBeTruthy();
        expect(emailControl?.errors).toBeNull();
      });
    });

    describe('Designation field validation', () => {
      it('should be invalid when designation is empty', () => {
        const designationControl = component.contactForm.get('designation');
        designationControl?.setValue('');
        designationControl?.markAsTouched();
        
        expect(designationControl?.valid).toBeFalsy();
        expect(designationControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid when designation has value', () => {
        const designationControl = component.contactForm.get('designation');
        designationControl?.setValue('Developer');
        
        expect(designationControl?.valid).toBeTruthy();
        expect(designationControl?.errors).toBeNull();
      });
    });
  });

  describe('UI Rendering', () => {
    it('should display the correct title', () => {
      const titleElement = debugElement.query(By.css('h2'));
      expect(titleElement.nativeElement.textContent.trim()).toBe('User Contact Form Example');
    });

    it('should render form with correct structure', () => {
      const formElement = debugElement.query(By.css('#contact-form'));
      expect(formElement).toBeTruthy();
      
      const nameInput = debugElement.query(By.css('input[formControlName="name"]'));
      const emailInput = debugElement.query(By.css('input[formControlName="email"]'));
      const designationInput = debugElement.query(By.css('input[formControlName="designation"]'));
      const submitButton = debugElement.query(By.css('button[type="submit"]'));
      
      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(designationInput).toBeTruthy();
      expect(submitButton).toBeTruthy();
    });

    it('should disable submit button when form is invalid', () => {
      const submitButton = debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeTruthy();
    });

    it('should enable submit button when form is valid', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john.doe@example.com',
        designation: 'Developer'
      });
      fixture.detectChanges();
      
      const submitButton = debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeFalsy();
    });
  });

  describe('Error Message Display', () => {
    it('should show name required error when name field is touched and empty', () => {
      const nameControl = component.contactForm.get('name');
      nameControl?.setValue('');
      nameControl?.markAsTouched();
      fixture.detectChanges();
      
      const errorElement = debugElement.query(By.css('div[style*="color: red"]'));
      expect(errorElement).toBeTruthy();
    });

    it('should show email required error when email field is touched and empty', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('');
      emailControl?.markAsTouched();
      fixture.detectChanges();
      
      const errorElements = debugElement.queryAll(By.css('div[style*="color: red"]'));
      expect(errorElements.length).toBeGreaterThan(0);
    });

    it('should show email format error when email format is invalid', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      fixture.detectChanges();
      
      const errorElements = debugElement.queryAll(By.css('div[style*="color: red"]'));
      expect(errorElements.length).toBeGreaterThan(0);
    });

    it('should not show errors when form fields are valid', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john.doe@example.com',
        designation: 'Developer'
      });
      fixture.detectChanges();
      
      const errorElements = debugElement.queryAll(By.css('div[style*="color: red"]'));
      expect(errorElements.length).toBe(0);
    });
  });

  describe('Form Submission', () => {
    it('should set submitted to true when onSubmit is called', () => {
      expect(component.submitted).toBeFalse();
      component.onSubmit();
      expect(component.submitted).toBeTruthy();
    });

    it('should call onSubmit when form is submitted', () => {
      spyOn(component, 'onSubmit');
      
      // Make form valid
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john.doe@example.com',
        designation: 'Developer'
      });
      fixture.detectChanges();
      
      const formElement = debugElement.query(By.css('form'));
      formElement.triggerEventHandler('ngSubmit', null);
      
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should prevent form submission when form is invalid', () => {
      spyOn(component, 'onSubmit');
      
      // Keep form invalid
      component.contactForm.patchValue({
        name: '',
        email: '',
        designation: ''
      });
      fixture.detectChanges();
      
      const submitButton = debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should update form values when user types in input fields', () => {
      const nameInput = debugElement.query(By.css('input[formControlName="name"]'));
      const emailInput = debugElement.query(By.css('input[formControlName="email"]'));
      const designationInput = debugElement.query(By.css('input[formControlName="designation"]'));
      
      nameInput.nativeElement.value = 'Test Name';
      nameInput.nativeElement.dispatchEvent(new Event('input'));
      
      emailInput.nativeElement.value = 'test@example.com';
      emailInput.nativeElement.dispatchEvent(new Event('input'));
      
      designationInput.nativeElement.value = 'Test Designation';
      designationInput.nativeElement.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      
      expect(component.contactForm.get('name')?.value).toBe('Test Name');
      expect(component.contactForm.get('email')?.value).toBe('test@example.com');
      expect(component.contactForm.get('designation')?.value).toBe('Test Designation');
    });

    it('should trigger validation when input fields lose focus', () => {
      const nameInput = debugElement.query(By.css('input[formControlName="name"]'));
      
      nameInput.nativeElement.focus();
      nameInput.nativeElement.blur();
      nameInput.triggerEventHandler('blur', null);
      
      fixture.detectChanges();
      
      expect(component.contactForm.get('name')?.touched).toBeTruthy();
    });
  });

  describe('Method Tests', () => {
    it('should initialize contactForm when createForm is called', () => {
      // Reset the form to test createForm method
      component.contactForm = null as any;
      component.createForm();
      
      expect(component.contactForm).toBeDefined();
      expect(component.contactForm.get('name')).toBeDefined();
      expect(component.contactForm.get('email')).toBeDefined();
      expect(component.contactForm.get('designation')).toBeDefined();
    });

    it('should create form with correct validators', () => {
      component.createForm();
      
      const nameControl = component.contactForm.get('name');
      const emailControl = component.contactForm.get('email');
      const designationControl = component.contactForm.get('designation');
      
      // Test required validators
      nameControl?.setValue('');
      emailControl?.setValue('');
      designationControl?.setValue('');
      
      expect(nameControl?.hasError('required')).toBeTruthy();
      expect(emailControl?.hasError('required')).toBeTruthy();
      expect(designationControl?.hasError('required')).toBeTruthy();
      
      // Test minLength validator for name
      nameControl?.setValue('ab');
      expect(nameControl?.hasError('minlength')).toBeTruthy();
      
      // Test email validator
      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();
    });
  });

  describe('Interface Testing', () => {
    describe('User Interface Contract Testing', () => {
      it('should conform to User interface structure', () => {
        const testUser: User = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          designation: 'Developer'
        };

        // Test interface structure
        expect(testUser.id).toBeDefined();
        expect(testUser.name).toBeDefined();
        expect(testUser.email).toBeDefined();
        expect(testUser.designation).toBeDefined();

        // Test property types
        expect(typeof testUser.id).toBe('number');
        expect(typeof testUser.name).toBe('string');
        expect(typeof testUser.email).toBe('string');
        expect(typeof testUser.designation).toBe('string');
      });

      it('should allow optional id property in User interface', () => {
        const userWithoutId: User = {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          designation: 'Designer'
        };

        expect(userWithoutId.id).toBeUndefined();
        expect(userWithoutId.name).toBe('Jane Doe');
        expect(userWithoutId.email).toBe('jane.doe@example.com');
        expect(userWithoutId.designation).toBe('Designer');
      });

      it('should validate User interface with different designation values', () => {
        const users: User[] = [
          { id: 1, name: 'User 1', email: 'user1@test.com', designation: 'Developer' },
          { id: 2, name: 'User 2', email: 'user2@test.com', designation: 'Designer' },
          { id: 3, name: 'User 3', email: 'user3@test.com', designation: 'Manager' }
        ];

        users.forEach(user => {
          expect(user.id).toBeDefined();
          expect(user.name).toBeDefined();
          expect(user.email).toBeDefined();
          expect(user.designation).toBeDefined();
          expect(typeof user.designation).toBe('string');
        });
      });
    });

    describe('ContactForm Interface Testing', () => {
      it('should conform to ContactForm interface structure', () => {
        const contactData: ContactForm = {
          name: 'Test Name',
          email: 'test@example.com',
          designation: 'Test Designation'
        };

        expect(contactData.name).toBeDefined();
        expect(contactData.email).toBeDefined();
        expect(contactData.designation).toBeDefined();

        expect(typeof contactData.name).toBe('string');
        expect(typeof contactData.email).toBe('string');
        expect(typeof contactData.designation).toBe('string');
      });

      it('should validate component contact object against ContactForm interface', () => {
        const contact: ContactForm = component.contact;

        expect(contact.name).toBeDefined();
        expect(contact.email).toBeDefined();
        expect(contact.designation).toBeDefined();

        expect(typeof contact.name).toBe('string');
        expect(typeof contact.email).toBe('string');
        expect(typeof contact.designation).toBe('string');
      });

      it('should allow empty string values in ContactForm interface', () => {
        const emptyContact: ContactForm = {
          name: '',
          email: '',
          designation: ''
        };

        expect(emptyContact.name).toBe('');
        expect(emptyContact.email).toBe('');
        expect(emptyContact.designation).toBe('');
      });
    });

    describe('FormValidationErrors Interface Testing', () => {
      it('should conform to FormValidationErrors interface structure', () => {
        const validationErrors: FormValidationErrors = {
          required: true,
          email: true,
          minlength: {
            requiredLength: 4,
            actualLength: 2
          }
        };

        expect(validationErrors.required).toBeDefined();
        expect(validationErrors.email).toBeDefined();
        expect(validationErrors.minlength).toBeDefined();

        expect(typeof validationErrors.required).toBe('boolean');
        expect(typeof validationErrors.email).toBe('boolean');
        expect(typeof validationErrors.minlength?.requiredLength).toBe('number');
        expect(typeof validationErrors.minlength?.actualLength).toBe('number');
      });

      it('should handle partial validation error objects', () => {
        const requiredError: FormValidationErrors = { required: true };
        const emailError: FormValidationErrors = { email: true };
        const minlengthError: FormValidationErrors = {
          minlength: { requiredLength: 4, actualLength: 2 }
        };

        expect(requiredError.required).toBeTruthy();
        expect(requiredError.email).toBeUndefined();

        expect(emailError.email).toBeTruthy();
        expect(emailError.required).toBeUndefined();

        expect(minlengthError.minlength).toBeDefined();
        expect(minlengthError.minlength?.requiredLength).toBe(4);
        expect(minlengthError.minlength?.actualLength).toBe(2);
      });
    });

    describe('FormControlInterface Testing', () => {
      it('should validate form control properties against interface', () => {
        const nameControl = component.contactForm.get('name');
        
        // Test interface compliance
        expect(nameControl?.value).toBeDefined();
        expect(nameControl?.valid).toBeDefined();
        expect(nameControl?.invalid).toBeDefined();
        expect(nameControl?.errors).toBeDefined();
        expect(nameControl?.touched).toBeDefined();
        expect(nameControl?.dirty).toBeDefined();
        expect(nameControl?.pristine).toBeDefined();
        expect(nameControl?.pending).toBeDefined();

        // Test property types
        expect(typeof nameControl?.valid).toBe('boolean');
        expect(typeof nameControl?.invalid).toBe('boolean');
        expect(typeof nameControl?.touched).toBe('boolean');
        expect(typeof nameControl?.dirty).toBe('boolean');
        expect(typeof nameControl?.pristine).toBe('boolean');
        expect(typeof nameControl?.pending).toBe('boolean');
      });

      it('should validate form control error structure', () => {
        const nameControl = component.contactForm.get('name');
        nameControl?.setValue('');
        nameControl?.markAsTouched();

        const errors = nameControl?.errors;
        if (errors) {
          expect(errors['required']).toBeDefined();
          expect(typeof errors['required']).toBe('boolean');
        }
      });
    });

    describe('ComponentInterface Testing', () => {
      it('should validate component conforms to ComponentInterface', () => {
        // Test property existence
        expect(component.text).toBeDefined();
        expect(component.contactForm).toBeDefined();
        expect(component.contact).toBeDefined();
        expect(component.submitted).toBeDefined();

        // Test method existence
        expect(component.createForm).toBeDefined();
        expect(component.onSubmit).toBeDefined();

        // Test property types
        expect(typeof component.text).toBe('string');
        expect(typeof component.submitted).toBe('boolean');
        expect(typeof component.createForm).toBe('function');
        expect(typeof component.onSubmit).toBe('function');

        // Test contact object structure
        expect(component.contact.name).toBeDefined();
        expect(component.contact.email).toBeDefined();
        expect(component.contact.designation).toBeDefined();
      });

      it('should validate component methods signature', () => {
        // Test method return types
        const createFormResult = component.createForm();
        const onSubmitResult = component.onSubmit();

        expect(createFormResult).toBeUndefined(); // void return
        expect(onSubmitResult).toBeUndefined(); // void return
      });
    });

    describe('Type Safety and Interface Compliance', () => {
      it('should enforce type safety for User creation', () => {
        // This test demonstrates compile-time type checking
        const createValidUser = (): User => {
          return {
            id: 1,
            name: 'Valid User',
            email: 'valid@email.com',
            designation: 'Valid Designation'
          };
        };

        const user = createValidUser();
        expect(user.id).toBe(1);
        expect(user.name).toBe('Valid User');
        expect(user.email).toBe('valid@email.com');
        expect(user.designation).toBe('Valid Designation');
      });

      it('should validate data transformation between interfaces', () => {
        // Transform ContactForm to User format
        const contactData: ContactForm = {
          name: 'John Doe',
          email: 'john@example.com',
          designation: 'Developer'
        };

        const userFromContact: User = {
          ...contactData,
          id: 1
        };

        expect(userFromContact.id).toBe(1);
        expect(userFromContact.name).toBe(contactData.name);
        expect(userFromContact.email).toBe(contactData.email);
        expect(userFromContact.designation).toBe(contactData.designation);
      });

      it('should validate array of interface objects', () => {
        const users: User[] = [
          { id: 1, name: 'User 1', email: 'user1@test.com', designation: 'Dev' },
          { id: 2, name: 'User 2', email: 'user2@test.com', designation: 'Designer' }
        ];

        users.forEach((user, index) => {
          expect(user.id).toBe(index + 1);
          expect(typeof user.name).toBe('string');
          expect(user.email).toContain('@');
          expect(typeof user.designation).toBe('string');
        });
      });

      it('should handle interface property defaults', () => {
        const defaultContact: ContactForm = {
          name: '',
          email: '',
          designation: ''
        };

        const defaultUser: User = {
          name: '',
          email: '',
          designation: ''
          // id is optional, so can be omitted
        };

        expect(defaultContact.name).toBe('');
        expect(defaultUser.id).toBeUndefined();
      });
    });

    describe('Interface Integration Testing', () => {
      it('should validate form data against User interface requirements', () => {
        // Set valid form data
        component.contactForm.patchValue({
          name: 'Integration Test User',
          email: 'integration@test.com',
          designation: 'Tester'
        });

        const formValue = component.contactForm.value;
        
        // Validate form value can be used as User interface (minus id)
        const userFromForm: Omit<User, 'id'> = {
          name: formValue.name,
          email: formValue.email,
          designation: formValue.designation
        };

        expect(userFromForm.name).toBe('Integration Test User');
        expect(userFromForm.email).toBe('integration@test.com');
        expect(userFromForm.designation).toBe('Tester');
      });

      it('should validate interface compliance in service integration', () => {
        // Simulate service response format
        const mockServiceResponse: User[] = [
          { id: 1, name: 'Service User 1', email: 'service1@test.com', designation: 'Developer' },
          { id: 2, name: 'Service User 2', email: 'service2@test.com', designation: 'Designer' }
        ];

        mockServiceResponse.forEach(user => {
          // Validate each user conforms to User interface
          expect(user.id).toBeDefined();
          expect(user.name).toBeDefined();
          expect(user.email).toBeDefined();
          expect(user.designation).toBeDefined();
          
          expect(typeof user.id).toBe('number');
          expect(typeof user.name).toBe('string');
          expect(typeof user.email).toBe('string');
          expect(typeof user.designation).toBe('string');
        });
      });
    });
  });
});
