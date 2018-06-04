import { Component, Output, Input, EventEmitter } from "@angular/core";
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from './user.service';

@Component({
		selector: "user",
		templateUrl: './user.component.pug',
		styleUrls: [ "./user.component.scss" ]
})
export class UserComponent {
	public isLoading = true;

	// Stores loaded user's data
	public user;
	
	// Import parent variables from the component "Messenger"
	private showUser: boolean = false;
	@Input('showUser')
	set setData(value: boolean) {
		this.showUser = value;
	}

	private userId: number = 0;
	@Input('userId')
	set setUserId(id: number) {
		this.userId = id;
	}

	constructor(private userService: UserService,
		private http: Http,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private title: Title) {
	}

	ngOnChanges() {
		this.getUserInfo(this.userId);
	}

	ngOnInit() {
	}

	/**
	 * Get JSON with users and find the chosen one
	 * @param {number} userID
	 */
	public getUserInfo(userId: number) {
		this.userService.getUsers().subscribe(
			data => {
				for (var i = 0; i < data.length; i++){
					if (data[i].id == userId){
						this.user = data[i];
						break;
					}
				}
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	/**
	 * Click on the button "Send message"
	 * Call the method getMessages() defined in the parent component "Messenger"
	 */
	@Output()
	public sendMessageClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();


	/**
	 * Append "год"/"года"/"лет" according to the number
	 * @param {number} age
	 * @return age and word splitted by space
	 */
	public ageToStr(age) {
		let word;
		let count = age % 100;
		if (count >= 5 && count <= 20) {
			word = 'лет';
		} 
		else {
			count = count % 10;
			if (count == 1) {
				word = 'год';
			} 
			else if (count >= 2 && count <= 4) {
				word = 'года';
			} 
			else {
				word = 'лет';
			}
		}
		return age+" "+word;
	}
}