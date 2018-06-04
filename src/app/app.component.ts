import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import 'bootstrap';

@Component({
    selector: "app",
    templateUrl: './app.component.pug',
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    
    public constructor() {}
    
    public ngOnInit(): void {}
    
}