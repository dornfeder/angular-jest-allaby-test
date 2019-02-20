import {
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import isEqual from 'lodash-es/isEqual';

import { Partners } from '../shared/constants/partners';

@Component({
    selector: 'form-page',
    templateUrl: './form-page.template.html',
    styleUrls: ['./form-page.style.scss']
})

export class FormPageComponent implements OnInit {

    public name: string = '';
    public match: boolean | undefined = undefined;
    protected search: string = 'Gary';

    constructor (
        private router: Router,
        private partners: Partners
    ) {}

    public ngOnInit () {
        console.log('hello world');
        console.log(this.router.config);
        console.log(this.partners);
    }

    public checkName (name: string) {
        this.name = name;
        this.match =  isEqual(this.name, this.search);
    }
}
