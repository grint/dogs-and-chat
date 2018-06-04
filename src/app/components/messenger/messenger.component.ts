import { Component } from "@angular/core";
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessengerService } from './messenger.service';

@Component({
		selector: "messenger",
		templateUrl: './messenger.component.pug',
		styleUrls: [ "./messenger.component.scss" ]
})
export class MessengerComponent {
	public isLoading = true;

	// Stores DB messages
	public messages = [];

	// Stores the new message types in the form textarea
	public newMessage: string;

	// Temporary hardcoded current user
	public currentUserId: number = 3;
	public currentUsername: string;

	// Used tp show messages block instead of the user's info
	public showMessages: boolean = false;

	// Used to show child component "User" - user's details info
	public showUserInfo: boolean = false;
	
	// Used to send the chosen user ID to the child component "User"
	public sendUserId: number;

	constructor(private messengerService: MessengerService,
		private http: Http,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private title: Title) {

		// Load user from the URL
		activatedRoute.params.subscribe(params => {
			if(params['userId'])
				this.loadUser(params['userId']);
		});
	}

	ngOnInit() {
	}

	/**
	 * Reset necessary variables and save current state in the URL
	 * @param {number} userId
	 */
	public loadUser(userId: number) {
		this.showUserInfo = true;
		this.showMessages = false;
		this.messages = [];
		this.newMessage = '';
		this.sendUserId = userId;
		this.router.navigate(['/messenger/user', this.sendUserId]);
	}

	/**
	 * Load JSON DB, filter unnecessary messages, sort by timestamp
	 * Save messages to "this.messages"
	 * @param {number} userID - load messages of the user with the ID
	 */
	public getMessages(userId) {
		this.messengerService.getMessages().subscribe(
			data => {
				let that = this;
				let myMessages = [];

				// Filter only my and user's messages
				// TODO: find better solution, not good complexity
				for (var i = 0; i < data.length; i++) {
					// Get messages with me as reciever
					if (data[i].id == userId) {
						that.messages = data[i].messages.filter(function(message) {
							return message.userId == that.currentUserId;
						}).map((message) => {
							message.username = data[i].details.name + ' ' + data[i].details.lastname;
							return message;
						});
					}
					// Get my messages with the user
					else if (data[i].id == that.currentUserId) {
						that.currentUsername = data[i].details.name + ' ' + data[i].details.lastname;
						myMessages = data[i].messages.filter(function(message) {
							return message.userId == userId;
						}).map((message) => {
							message.username = that.currentUsername;
							return message;
						}); 
					}
				}
				that.messages = that.messages.concat(myMessages).sort(function(x, y){
					return x.date - y.date;
				});

				this.showMessages = true;
				this.showUserInfo = false;
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	/**
	 * Temporary helper function to generate a random message ID
	 * @return {number} ID
	 */
	private getRandomId() {
		return Math.floor((Math.random()*128)+1);
	}

	/**
	 * Add new message to the array "this.messages"
	 * @param {string} text - message text typed n the form textarea
	 */
	saveMessage(text: string): void {
		if(text) {
			let newMessage = {};
			newMessage['id'] = this.getRandomId();
			newMessage['text'] = text;
			newMessage['userId'] = this.sendUserId;
			newMessage['username'] = this.currentUsername;
			newMessage['date'] = Math.floor(Date.now() / 1000)+'000';
			this.messages.push(newMessage);	
			this.newMessage = '';		
		}
	}

}