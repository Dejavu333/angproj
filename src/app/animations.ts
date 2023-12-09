import { trigger, style, animate, transition, state } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  state('void', style({ opacity: 0 })),
  state('fade', style({ opacity: 1 })),
  transition('void => fade', animate('300ms')),
  transition('fade => void', animate('300ms'))
])
