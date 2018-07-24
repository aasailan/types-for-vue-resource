/*
 * @Author: qiao 
 * @Date: 2018-02-06 16:55:37 
 * @Last Modified by: qiao
 * @Last Modified time: 2018-02-19 13:41:59
 */

import { PluginFunction } from 'vue';
import { type } from 'os';

interface HttpMethod {
    get: (url: string, options?: HttpOptions) => PromiseLike<HttpResponse>;
    head: (url: string, options?: HttpOptions) => PromiseLike<HttpResponse>;
    delete: (url: string, options?: HttpOptions) => PromiseLike<HttpResponse>;
    jsonp: (url: string, options?: HttpOptions) => PromiseLike<HttpResponse>;
    post: (url: string, body: httpRequestBodys, options?: HttpOptions) => PromiseLike<HttpResponse>;
    put: (url: string, body: httpRequestBodys, options?: HttpOptions) => PromiseLike<HttpResponse>;
    patch: (url: string, body: httpRequestBodys, options?: HttpOptions) => PromiseLike<HttpResponse>;
}

interface ResponseInterceptor {
    (httpResponse?: HttpResponse): void;
}

interface RequestInterceptor {
    (request: HTTPRequest, next:(responseInterceptor?: ResponseInterceptor | HttpResponse) => void): void;
} 

// default interceptors
interface DefaultRequestInterceptor {
    before: RequestInterceptor;
    method: RequestInterceptor;
    jsonp: RequestInterceptor;
    json: RequestInterceptor;
    form: RequestInterceptor;
    header: RequestInterceptor;
    cors: RequestInterceptor;
    [interceptorName: string]: RequestInterceptor;
}

export interface http extends HttpMethod {
    options: HttpOptions;
    headers: HttpHeaderOptions;

    interceptors: RequestInterceptor[];
    interceptor: DefaultRequestInterceptor;
}

export interface $http extends HttpMethod {
}

interface header {
    [headerName: string]: string;
}
interface HttpHeaderOptions {
    put?: header;
    post?: header;
    patch?: header;
    delete?: header;
    common?: header;
    custom?: header;
}


type httpRequestBodys = object | string | FormData;

// HttpOptions
export interface HttpOptions {
    root?: string; // root url

    url?: string; // URL to which the request is sent
    body?: httpRequestBodys; // Data to be sent as the request body
    headers?: header; // Headers object to be sent as HTTP request headers
    params?: object; // Parameters object to be sent as URL parameters
    method?: string; // HTTP method (e.g. GET, POST, ...)
    responseType?: string; // Type of the response body (e.g. text, blob, json, ...)
    timeout?: number; // Request timeout in milliseconds (0 means no timeout)
    credentials?: boolean; // Indicates whether or not cross-site Access-Control requests should be made using credentials
    emulateHTTP?: boolean; // Send PUT, PATCH and DELETE requests with a HTTP POST and set the X-HTTP-Method-Override header
    emulateJSON?: boolean; // 	Send request body as application/x-www-form-urlencoded content type

    before?(request: HTTPRequest): void; // Callback function to modify the request options before it is sent
    progress?(event: any): void; // Callback function to handle the ProgressEvent of uploads
}


// HTTP Request
declare class HTTPRequest {
    constructor(opt: HttpOptions);

    url?: string; // URL to which the request is sent
    body?: httpRequestBodys; // Data to be sent as the request body
    headers?: HttpHeaders; // Headers object to be sent as HTTP request headers

    params?: object; // Parameters object to be sent as URL parameters
    method?: string; // HTTP method (e.g. GET, POST, ...)
    responseType?: string; // Type of the response body (e.g. text, blob, json, ...)
    timeout?: number; // Request timeout in milliseconds (0 means no timeout)
    credentials?: boolean; // Indicates whether or not cross-site Access-Control requests should be made using credentials
    emulateHTTP?: boolean; // Send PUT, PATCH and DELETE requests with a HTTP POST and set the X-HTTP-Method-Override header
    emulateJSON?: boolean; // 	Send request body as application/x-www-form-urlencoded content type

    before?(request: HTTPRequest): void; // Callback function to modify the request options before it is sent
    progress?(event: any): void; // Callback function to handle the ProgressEvent of uploads

    getUrl(): string;
    getBody(): httpRequestBodys;
    respondWith(body: httpRequestBodys, opts: HttpOptions): HttpResponse;
}

// HTTP Response
// type any = object | string | Blob;

declare class HttpResponse  {
    constructor(body: any, opt: HttpOptions);

    url: string;
    ok: boolean;
    status: number;
    statusText: string;
    headers: HttpHeaders;
    body: any;

    bodyText?: string | PromiseLike<string>;
    bodyBlob?: Blob;

    data: any;

    blob(): PromiseLike<Blob>;
    text(): PromiseLike<string>;
    json(): PromiseLike<object>;
}

// HTTP header 
declare class HttpHeaders {
    constructor(header: header);

    private map: { 
        [key: string]: [string]
    }

    has(name: string): boolean;
    get(name: string): string;
    getAll(name: string): string[];
    set(name: string, value: string): void;
    append(name: string, value: string): void;
    delete(name: string): void;
    deleteAll(): void;
    forEach(callback: (value?: string, name?: string, this$1?: this) => void, thisArg?: any): void;
}

// resource
interface ResourceMethod {
    (params: object, body: object): PromiseLike<HttpResponse>;
    (body: object): PromiseLike<HttpResponse>;
    (): PromiseLike<HttpResponse>;
}

interface ResourceMethods {
    get: ResourceMethod;
    save: ResourceMethod;
    query: ResourceMethod;
    update: ResourceMethod;
    remove: ResourceMethod;
    delete: ResourceMethod;
}

interface CustomAction {
    [actionName: string]: {
        method: string;
        url?: string;
        [propName: string]: string;
    }
}

interface ResourceActions {
    get: { method: string };
    save: { method: string };
    query: { method: string };
    update: { method: string };
    remove: { method: string };
    delete: { method: string };
}

export interface Resource {
    (url: string, params?: object, actions?: CustomAction, options?: HttpOptions): ResourceMethods;
    actions: ResourceActions;
}

// Url
export interface Url {
    (url: string, params: object): string;
    options: {
        url: string;
        root: string;
        params: object;
    }
    transform: any;
    transforms: any[];
    params: (obj: object) => string;
    parse: (url: string) => {
        href: string;
        protocol: string;
        port: number;
        host: string;
        hostname: string;
        pathname: string;
        search: string;
        hash: string;
    }; 
}

declare const VueResource: PluginFunction<any>;

export default VueResource;