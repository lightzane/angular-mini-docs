import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const listAnim = trigger('listAnim', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateX(-200px)', }),
            stagger('100ms', animate('0.5s cubic-bezier(0, 1.4, 1, 1)'))
        ], { optional: true }),
        // query(':leave', [
        //     stagger('0.1s', animate('0.2s', style({ opacity: 0 })))
        // ], { optional: true })
    ])
]);

export const listPopIn = trigger('listPopIn', [
    transition('* => *', [
        query(':enter', [
            style({ transform: 'scale(0)' }),
            stagger('100ms', animate('250ms cubic-bezier(0, 1.4, 1, 1)'))
        ], { optional: true }),
        // query(':leave', [
        //     stagger('0.1s', animate('0.2s', style({ opacity: 0 })))
        // ], { optional: true })
    ])
]);

export const slideIn = trigger('slideIn', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('0.5s ease-out')
    ]),
    transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'translateX(-100px)' }))
    ])
]);

export const popIn = trigger('popIn', [
    transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('250ms cubic-bezier(0, 1.4, 1, 1)')
    ])
]);

export const slide = trigger('slide', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('250ms ease-out', style({ opacity: '1', transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
        animate('250ms ease-out', style({ opacity: '0', transform: 'translateY(-100%)' }))
    ])
]);
