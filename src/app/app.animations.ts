import { trigger, style, animate, transition } from '@angular/animations';

export const fadeAnimation = trigger(
    "fade",
    [
        transition(
            ':enter',
            [
                style({ opacity: 0 }),
                animate('{{animationDuration}}',
                style({ opacity: 1 })),
            ],
            { params: { animationDuration: '300ms' } } //default values
        ),

        transition(
            ':leave',
            [
                animate('{{animationDuration}}',
                style({ opacity: 0 })),
            ],
            { params: { animationDuration: '300ms' } }
        ),
    ]
);



export const scaleAnimation = trigger(
    'scale',
    [
        transition(
            ':enter',
            [
                style({ transform: 'scale({{startScale}})' }),
                animate('{{animationDuration}}',
                style({ transform: 'scale({{endScale}})' })),
            ],
            { params: { startScale: '0', endScale: '1', animationDuration: '300ms' } }
        ),

        transition(
            ':leave',
            [
                animate('{{animationDuration}}'),
                style({ transform: 'scale({{startScale}})' })
            ],
            { params: { animationDuration: '300ms' } }
        ),
    ]
);