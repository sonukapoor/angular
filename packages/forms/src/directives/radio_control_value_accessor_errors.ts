/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


export class RadioControlValueAccessorErrors {
  static throwNameError(): void {
    throw new Error(`
        If you define both a name and a formControlName attribute on your radio button, their values
        must match. Ex: <input type="radio" formControlName="food" name="food">
      `);
  }
}
