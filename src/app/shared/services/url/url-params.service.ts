import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { IUrlParams } from './url-params.interface';

@Injectable()
export class UrlParamsService {

    private urlParams: IUrlParams = {};

    constructor () {
        this.getAllParams();
    }

    public get (name: string) {
        return this.urlParams[`${name}`.toLowerCase()] || null;
    }

    private registerParamItem (
        name: string, value: string, index?: string, isArray: boolean = false
    ) {
        // When ob array entry is not already a subarray
        if (isArray) {
            if (!Array.isArray(this.urlParams[name])) {
                this.urlParams[name] = [];
            }
            if (index) {
                // If an array key index is defined set the defined array entry
                this.urlParams[name][index] = value;
            } else {
                //  Push param entry to the already existing subarray in obj
                this.urlParams[name].push(value);
            }
        } else {
            this.urlParams[name] = value;
        }
    }

    private getAllParams () {
        const queryString = this.getQueryString();
        // To avoid double filling of the array clear it first
        this.urlParams = {};
        if (queryString) {
            const urlParamArray = this.trimAndSplitQueryString(queryString);

            for (const item of urlParamArray ) {
                this.buildParamsArrayOutOfValuePair(item);
            }
        }
    }

    private getQueryString (): string {
        let qs: string = '';
        if (environment.settings.useHash) {
            qs = window.location.hash;
            qs = qs.indexOf('?') >= 0 ? qs.substr(qs.indexOf('?') + 1) : '';
        } else {
            qs = window.location.search.slice(1);
        }
        return qs;
    }

    private buildParamsArrayOutOfValuePair (valuePair: string) {
        // Check for array structure in url params
        const arrayWithValuePair = valuePair.split('=');
        let index: string | undefined;
        let isArray: boolean = false;
        let paramName = arrayWithValuePair[0].toLowerCase();
        paramName = paramName.replace(/\[.*\]/, (v: string) => {
            index = v.slice(1, -1);
            isArray = true;
            return '';
        });
        const valueType = typeof arrayWithValuePair[1];
        let paramValue = valueType === 'undefined' ? '' : arrayWithValuePair[1];
        paramValue = decodeURIComponent(paramValue);

        // Goes through array to check whether there is already an entry
        // With the same name already exists...if this is an array push it in the array
        // Check whether obj already contains value from parameter
        this.registerParamItem(paramName, paramValue, index, isArray);
    }

    private trimAndSplitQueryString (queryString: string) {
        // If search string ends with / cut it out
        if (queryString[queryString.length - 1] === '/') {
            queryString = queryString.slice(0, -1);
        }
        return queryString.split('&');
    }
}
