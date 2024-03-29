import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable,throwError} from 'rxjs';
import {catchError,retryWhen,retry,delay,take} from 'rxjs/operators';

@Injectable()
export class messageService{

    constructor(private _http :HttpClient){

    }

    getEmployees():Observable<any>{
        return this._http.get<any>("http://localhost:3000/employees1")
        .pipe(catchError(this.handleError))
        .pipe(retryWhen(errors => errors.pipe(delay(1000), take(10))))
      // retryWhen(errors => errors.pipe(delay(retryITNERVAL), take(retryCOUNT), concat(throwError("Giving up Retry.!")))),
        //This will complete the whole observable after 10 attempts. If you want to error the whole observable after 10 attempts, the observable returned by the retryWhen callback must throw:
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
