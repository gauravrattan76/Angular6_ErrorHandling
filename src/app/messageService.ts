import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable,throwError} from 'rxjs';
import {catchError,retryWhen,retry} from 'rxjs/operators';

@Injectable()
export class messageService{

    constructor(private _http :HttpClient){

    }

    getEmployees():Observable<any>{
        return this._http.get<any>("http://localhost:3000/employees2")
        .pipe(catchError(this.handleError))
        .pipe(retry())
    }

    handleError(errorResponse:HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent)
        {
            console.log("client side error" + errorResponse.error.message);
        }
        else{
            console.log("server side error" + errorResponse);
        }
        return throwError("There is issue with the service please trya fter sometime");
    }
}