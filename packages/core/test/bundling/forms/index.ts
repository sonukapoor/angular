/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Component, NgModule, ɵrenderComponent as renderComponent} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {platformBrowser} from '@angular/platform-browser';

@Component({
  selector: 'app-template-forms',
  template: `<form #f='ngForm' novalidate>
    <div ngModelGroup='profileForm' #nameCtrl='ngModelGroup'>
      <div>
        First Name:
        <input name='first' ngModel required #first='ngModel' />
      </div>
      <div>
        Last Name:
        <input name='last' ngModel />
      </div>
      <div>
        Subscribe:
        <input name='subscribed' type='checkbox' ngModel />
      </div>
    </div>
    <div>
      <div>Disabled: <input name='foo' ngModel disabled /></div>
      <button>Submit</button>
    </div>
  </form>`,
})
class TemplateFormsComponent {
  name = {first: 'Nancy', last: 'Drew', subscribed: true};
}

@Component({
  selector: 'app-reactive-forms',
  template: `<form [formGroup]='profileForm'>
    <div>
      First Name:
      <input type='text' formControlName='firstName' />
    </div>
    <div>
      Last Name:
      <input type='text' formControlName='lastName' />
    </div>

    <div>
      Subscribe:
      <input type='checkbox' formControlName='subscribed' />
    </div>

    <div>Disabled: <input formControlName='disabledInput' /></div>
    <div
      formArrayName='addresses'
      *ngFor='let item of itemControls; let i = index'
    >
      <div [formGroupName]='i'>
        <div>City: <input formControlName='city' /></div>
      </div>
    </div>
    <button (click)='addItem()'>Add</button>
  </form> `,
})
class ReactiveFormsComponent {
  profileForm!: FormGroup;
  addresses!: FormArray;

  get itemControls() {
    return (this.profileForm.get('addresses') as FormArray).controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      addresses: new FormArray([]),
      subscribed: new FormControl(),
      disabledInput: new FormControl({value: '', disabled: true}),
    });

    this.addItem();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      city: '',
    });
  }

  addItem(): void {
    this.addresses = this.profileForm.get('addresses') as FormArray;
    this.addresses.push(this.createItem());
  }
}

@Component({
  selector: 'app-root',
  template: `
    <app-template-forms></app-template-forms>
    <app-reactive-forms></app-reactive-forms>
  `
})
class RootComponent {
}

@NgModule({
  declarations: [RootComponent, TemplateFormsComponent, ReactiveFormsComponent],
  imports: [FormsModule, ReactiveFormsModule],
  bootstrap: [RootComponent]
})
class FormsExampleModule {
}

platformBrowser().bootstrapModule(FormsExampleModule);

// renderComponent(TemplateFormsComponent);
// renderComponent(ReactiveFormsComponent);
