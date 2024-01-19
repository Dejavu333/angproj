import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { debounceTime, startWith, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-print-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-error.component.html',
  styleUrl: './print-error.component.css'
})
export class PrintErrorComponent implements OnInit {
    @Input("control")
    control: FormControl | undefined;

    displayErrors: boolean = false;

    @Input("visible-for")
    visibleFor: number = 3000; // Set the visibility duration to 3000ms

    @Input("show-on")
    showOn: 'submit' | 'valueChange' = 'valueChange'; // New input to control when to show errors

    @Input("form")
    form: NgForm | FormGroupDirective | undefined; // New input for the form

    constructor() {}

    ngOnInit(): void {
        if (this.control && this.showOn === 'valueChange') {
            this.control.valueChanges.pipe(
                debounceTime(300), // adjust this to the desired debounce time
                startWith(''), // to immediately start the timer
                switchMap(() => timer(this.visibleFor)),
                takeUntilDestroyed() // Automatically unsubscribe when the component is destroyed
            ).subscribe(() => {
                this.displayErrors = false; // Always set displayErrors to false after the timer
            });
        }

        if (this.form && this.showOn === 'submit') {
            this.form.ngSubmit.pipe(
                takeUntilDestroyed() // Automatically unsubscribe when the component is destroyed
            ).subscribe(() => {
                this.displayErrors = false; // Always set displayErrors to false on form submit
            });
        }
    }
}