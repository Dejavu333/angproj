import { AbstractControl, ValidatorFn } from '@angular/forms';

export function containsUppercaseValidator(): ValidatorFn {
    return function (control: AbstractControl): { [key: string]: any } | null {
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { containsUppercase: true };
    };
}