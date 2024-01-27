import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { debounceTime, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-print-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-error.component.html',
  styleUrl: './print-error.component.css'
})
export class PrintErrorComponent implements OnInit {
    @Input("control")
    control: FormControl | AbstractControl | undefined;
    displayErrors: boolean = false;
    
    @Input("visible-for")
    visibleFor: number = 3000; // Set the visibility duration to 3000ms

    @Input("form")
    form: NgForm | FormGroupDirective | undefined; // New input for the form

    constructor() {}
    
    ngOnInit(): void {
        if (this.control) {
            this.control.valueChanges.pipe(
                debounceTime(300),
                tap(() => {
                    if(this.control?.valid) return;
                    this.displayErrors = true; // Set displayErrors to true after debounceTime
                    console.log("valuechangestriggeredFC")
                }),
                switchMap(() => timer(this.visibleFor)),
            ).subscribe(() => {
                this.displayErrors = false; // Set displayErrors to false after visibleFor milliseconds
            });
        }

        if (this.control) {
            this.control.valueChanges?.pipe(
                debounceTime(300),
                tap(() => {
                    if(this.control?.valid) return;
                    this.displayErrors = true; // Set displayErrors to true after debounceTime
                    console.log("valuechangestriggeredFG")
                }),
                switchMap(() => timer(this.visibleFor)),
            ).subscribe(() => {
                this.displayErrors = false; // Set displayErrors to false after visibleFor milliseconds
            });
        }

        if (this.form) {
            this.form?.ngSubmit.pipe(
                tap(() => { this.displayErrors = true }),
                switchMap(() => timer(this.visibleFor)),
            ).subscribe(() => {
                console.log(this.form?.errors)
                this.displayErrors = false; // Set displayErrors to false after visibleFor milliseconds
            });
        }
    }
}