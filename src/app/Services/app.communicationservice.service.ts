import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class CommunicationService {
    
    onNameReceived:EventEmitter<string>;
    
    constructor(){
      
        this.onNameReceived = new EventEmitter<string>();
    }

    receiveName(name : string):void{
        this.onNameReceived.emit(name);
    }
}