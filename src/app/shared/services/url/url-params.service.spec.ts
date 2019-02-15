import { async } from '@angular/core/testing';
import { environment } from 'environments/environment';

import { UrlParamsService } from './url-params.service';

describe(`UrlParamsService`, () => {

    let service: UrlParamsService;
    const testUrl: string =
        ( environment.settings.useHash ? '#' : '' )
        + '/foo/bar/?partnerId=1922&arr=4&arr=3&arr[]=777&arr[0]=1&arr[1]=666&test[foo]=bar';

    beforeEach(async(() => {
        // See https://github.com/facebook/jest/issues/890#issuecomment-415202799
        window.history.pushState({}, 'Test Title', testUrl);
        service = new UrlParamsService();
    }));

    it('should be able to get all params with urlparamsservice', () => {
        expect(service.get('partnerId')).toEqual('1922');
        expect(service.get('arr')).toEqual(['1', '666']);
        expect(service.get('test')['foo']).toEqual('bar');
        expect(service.get('blubb')).toEqual(null);
    });

});
