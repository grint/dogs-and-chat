import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UsersService } from './users.service';

@Component({
		selector: "users",
		templateUrl: './users.component.pug',
		styleUrls: [ "./users.component.scss" ],
		encapsulation: ViewEncapsulation.None // bug with _ngcontent-c*, TODO
})
export class UsersComponent {
	public isLoading = true;

	public users;

	constructor(private usersService: UsersService,
		private http: Http,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private title: Title) {}

	ngOnInit() {
		this.getUsers();
	}

	// Call the method loadUser() defined in "Messenger"
	@Output()
	 public loadUserClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	// Get parent variables from the component "Messenger"
	private isMessagesShown: boolean = false;
	@Input('showMessages')
	set setIsMessagesShown(showOrNot: boolean) {
		this.isMessagesShown = showOrNot;
	}

	private isUserInfoShown: boolean = false;
	@Input('showUserInfo')
	set setIsUserInfoShown(showOrNot: boolean) {
		this.isUserInfoShown = showOrNot;
	}

	private currentUserId: number = 0;
	@Input('userId')
	set setCurrentUserId(userId: number) {
		this.currentUserId = userId;
	}

	/**
	 * Get JSON with users and remove the current user
	 */
	public getUsers() {
		this.usersService.getUsers().subscribe(
			data => {
				let that = this;
				// Filter current user
				this.users = data.filter(item => {
					return item.id != that.currentUserId
				});
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}
}