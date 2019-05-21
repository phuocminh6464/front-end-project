import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    //public server = 'https://localhost:44350/';
    public server = 'http://192.168.136.127:6464/';
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}
