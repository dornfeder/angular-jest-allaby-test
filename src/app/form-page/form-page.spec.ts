import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Partners } from '../shared/constants/partners';

import { FormPageComponent } from './form-page.component';
import * as MockTest from './mocktest';

jest.mock('./mocktest', () => ({
    getSomething: () => 'mockValue'
}));

describe('FormPageComponent', () => {
    let comp: FormPageComponent;
    let fixture: ComponentFixture<FormPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormPageComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: Router,
                    useValue: { navigate: jest.fn(), config: {hello: 'world'}}
                },
                Partners,
            ]
        });
        fixture = TestBed.createComponent(FormPageComponent);
        comp = fixture.componentInstance;
    }));

    it('should call ngOnInit', () => {
        jest.spyOn(comp, 'ngOnInit');
        fixture.detectChanges();
        expect(comp.ngOnInit).toHaveBeenCalled();
    });

    it('should call console.log', async () => {
        jest.spyOn(console, 'log');
        fixture.detectChanges();
        expect(console.log).toHaveBeenCalled();
    });

    it('should return something', async () => {
        expect(MockTest.getSomething()).toEqual('mockValue');
    });

});
