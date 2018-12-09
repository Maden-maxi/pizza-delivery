export class Route {
    path: string | RegExp;
    params: string[];
    /**
     * In array can be - get, post, put, delete, all
     */
    authRequired: string[] | any;
    getParams(url: string): any {
        let params = {};
        if (this.params) {
            this.params.forEach((value, index) => {
                params[value] = url.replace(this.path, '$' + (index + 1));
            });
        }
        return params;
    }
}