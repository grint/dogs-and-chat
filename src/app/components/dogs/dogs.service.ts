import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DogsService {
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	// GET all breeds to JSON
	getBreeds(): Observable<any> {
		return this.http.get('https://dog.ceo/api/breeds/list/all').map(res => res.json());
	}

	// GET a random image of the chosen breed or sub-breed
	getRandomBreedImage(breed: string, subbreed: string): Observable<any> {
		if(subbreed) {
			return this.http.get(`https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`).map(res => res.json());
		}
		else {
			return this.http.get(`https://dog.ceo/api/breed/${breed}/images/random`).map(res => res.json());
		}
		
	}
}
