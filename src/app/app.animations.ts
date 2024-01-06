import { trigger, style, animate, transition, keyframes } from '@angular/animations';

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
                style({ transform: 'scale({{startScale}})' }),
            ],
            { params: { startScale: '0', animationDuration: '300ms' } }
        ),
    ]
);

export const flyInOutAnimation = [
    trigger('flyInOut', [
        transition(
            "void => fly-in", 
            [
                animate(150, keyframes([
                    style({ transform: 'scale(2.75) translateX(100%)', opacity: 0 }),
                    style({ transform: 'scale(0.75) translateX(0) ', opacity: 1, }),
                ]))
            ]
        ),
        transition(
            "* => void", 
            [
                animate(150, keyframes([
                    style({ opacity: 1 }),
                    style({ opacity: 0 }),
                ]))
            ]
        ),
    ])
];