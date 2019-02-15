import { Injectable } from '@angular/core';

import { IPartner } from './partner.interface';

@Injectable()
export class Partners {
    public default: number = 1;

    public all: IPartner[] = [
        {
            id: 1,
            name: 'One'
        },
        {
            id: 2,
            name: 'Two'
        },
    ];
}
