import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Partners } from './shared/constants/partners';
import { UrlParamsService } from './shared/services/url';

describe(`App`, () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let urlParamsService: any;
    let partners: any = {
        default: 88,
        all: [ {id: 1}, {id: 1922} ]
    };

    /**
     * async beforeEach
     */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: DomSanitizer,
                    useValue: {
                        sanitize: () => 'safeString',
                        bypassSecurityTrustResourceUrl: () => 'safeUrl'
                    }
                },
                {
                    provide: UrlParamsService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: Partners,
                    useValue: partners
                },
            ],
        })
            /**
             * Compile template and css
             */
            .compileComponents();
    }));

    /**
     * Synchronous beforeEach
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        debugElement = fixture.debugElement;
        urlParamsService = debugElement.injector.get(UrlParamsService);
        partners = debugElement.injector.get(Partners);
    });

    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });

    it.each([
        [1, 1],
        [null, partners.default],
        [88888, partners.default],
        ['xhfz', partners.default],
        [1922, 1922],
    ])(
        'For service value %s, should provide PartnerId %i',
        (returnValue: any, expectedValue: number) => {
            fixture.detectChanges();
            urlParamsService.get.mockReturnValue(returnValue);
            jest.spyOn(urlParamsService, 'get');
            comp.ngOnInit();

            expect(urlParamsService.get).toHaveBeenCalled();
            expect(comp.partnerId).toEqual(expectedValue);
            expect(comp.cssUrl).toEqual('safeUrl');
        }
    );

});
