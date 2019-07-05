import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Config } from './config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private config: Config) {}

	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

	getBlocks() {
	  const url = `${this.config.url}/wp-admin/admin-ajax.php?action=mstoreapp-keys`;
	  return this.http.get(url, this.config.options).pipe(
	    tap(_ => {}),
	    catchError(this.handleError(`getBlocks`))
	  );
	}

	getItem(endPoint, filter = {}){
		const url = this.config.setUrl('GET', '/wp-json/wc/v3/' + endPoint + '?', filter);
		return this.http.get(url).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	deleteItem(endPoint, id){
		const url = this.config.setUrl('DELETE', '/wp-json/wc/v3/' + endPoint + "/" + id + '?',{});
		return this.http.delete(url).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	postItem(endPoint, data = {}){
		var params = new HttpParams();
		for (var key in data) { if('object' !== typeof(data[key])) params = params.set(key, data[key]) }
		const url = this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-' + endPoint;
		return this.http.post(url, params, this.config.options).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	updateCart(endPoint, params){
		const url = this.config.url + endPoint;
		return this.http.post(url + endPoint, params, this.config.options).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	getItemMstore(endPoint, filter = {}){
		const url = this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-' + endPoint;
		return this.http.get(url, this.config.options).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	ajaxCall(endPoint, data = {}){
		var params = new HttpParams();
		for (var key in data) { if('object' !== typeof(data[key])) params = params.set(key, data[key]) }
		const url = this.config.url + endPoint;
		return this.http.post(url, params, this.config.options).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	getPosts(endPoint){
		return this.http.get(this.config.url + endPoint).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	WCMPVendor(endPoint, params = {}){
		const url = this.config.setUrl('GET', '/wp-json/wcmp/v1/' + endPoint + '?', params);
		return this.http.get(url).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	put(endPoint, data, params = {}){
		const url = this.config.setUrl('PUT', '/wp-json/wc/v3/' + endPoint + '?', params);
		return this.http.put(url, data).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}
	
	wcpost(endPoint, data, params = {}){
		const url = this.config.setUrl('POST', '/wp-json/wc/v3/' + endPoint + '?', params);
		return this.http.post(url, data).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	getReviews(endPoint, filter = {}){
		const url = this.config.setUrl('GET', '/wp-json/wc/v2/' + endPoint + '?', filter);
		return this.http.get(url).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}

	getExternalData(url, data = {}){
		var params = new HttpParams();
		for (var key in data) { if('object' !== typeof(data[key])) params = params.set(key, data[key]) }
		return this.http.post(url, params, this.config.options).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(url))
		);
	}

	getAddonsList(endPoint, filter = {}){
		const url = this.config.setUrl('GET', '/wp-json/wc-product-add-ons/v1/' + endPoint + '?', filter);
		return this.http.get(url).pipe(
		    tap(_ => {}),
		    catchError(this.handleError(endPoint))
		);
	}
}
