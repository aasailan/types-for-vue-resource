/*
 * @Author: qiao 
 * @Date: 2018-02-13 21:27:06 
 * @Last Modified by: qiao
 * @Last Modified time: 2018-02-19 11:07:26
 */
import Vue from "vue";
import { http, $http, Resource, Url, HttpOptions } from "./vue-resource";

declare module "vue/types/vue" {
    interface VueConstructor {
        url?: Url;
        http?: http;
        resource?: Resource;
        Promise?: PromiseLike<any>;
    }

    interface Vue {
        $url: Url;
        $http: $http;
        $resource: Resource;
        $promise: PromiseLike<any>;
    }
}

declare module "vue/types/options" {
     interface ComponentOptions<V extends Vue> {
        http?: HttpOptions;
    }
}

