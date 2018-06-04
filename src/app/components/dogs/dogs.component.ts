import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { DogsService } from './dogs.service';

@Component({
	selector: "dogs",
	templateUrl: './dogs.component.pug',
	styleUrls: [ "./dogs.component.scss" ],
	encapsulation: ViewEncapsulation.None // bug with _ngcontent-c*, TODO
})

export class DogsComponent implements OnInit {
	public pageTitle:string = "Dogs";
		public isLoading = true;

		// Stores the loaded list with the breeds
		public breeds = [];

		// Stores the current breed
		private currentBreed;

		// Stores the current sub-breed
		private currentSubBreed;

		// Store the loaded random image of a breed
		public randomImage;

		// To check if the data is loaded successfully
		// Yes = "success"
		public status;

		// Helper to store the dropdown chosen value
		private value:any = {};

		constructor(private dogsService: DogsService,
			private http: Http,
			private activatedRoute: ActivatedRoute,
			private router: Router,
			private title: Title) 
		{ 
			// Load the image if it's a breed/sub-breed page
			activatedRoute.params.subscribe(params => {
				this.currentBreed = params['breed'];
				this.currentSubBreed = params['subbreed'];

				let title = this.capitalize(this.currentBreed) + ' ';
				
				if(this.currentBreed) {
					if(this.currentSubBreed) {
						title = title + this.capitalize(this.currentSubBreed);
					}				
					this.title.setTitle(title);
					this.setPageTitle(title);
					this.getRandomBreedImage(this.currentBreed, this.currentSubBreed);
				}			
			});

		}

	// Load all breeds from the API on the component load
	ngOnInit() {
		this.getBreeds();
	}

	/**
	 * Get the breeds list from the API and store to "this.breeds"
	 * Flatten it to an array to avoid complex templating
	 */
	public getBreeds() {
		this.dogsService.getBreeds().subscribe(
			data => {
				let response = data.message;
				Object.keys(response).map(e => {
					if(response[e].length > 0) {
						let that = this;
						response[e].forEach(function(subbreed) {
							// Sub-breed = Breed + Sub-breed
							that.breeds.push(that.capitalize(e) + ' ' + that.capitalize(subbreed));
						});
					}
					else {
						this.breeds.push(this.capitalize(e));
					}
				});
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	/**
	 * Get a random image of a breed from the API and store to "this.randomImage"
	 * @param {string} breed
	 * @param {string} subbreed
	 */
	public getRandomBreedImage(breed: string, subbreed: string):void {
		this.dogsService.getRandomBreedImage(breed, subbreed).subscribe(
			data => {
				this.status = data.status;
				this.randomImage = data.message;
			},
			error => {
				this.status = error.status;
				console.log(error)
			},
			() => this.isLoading = false
		);
	
	}

	/**
	 * Helper to navigate either to a breed or a sub-breed page
	 * @param {string} route - breed name or "breed subbreed"
	 */
	private navigateToRoute(route) {
		let breeds = route.id.toLowerCase().split(" ");
		if(breeds.length > 1) {
			this.router.navigate(['/dogs', breeds[0], breeds[1]]);
		}
		else {
			this.router.navigate(['/dogs', breeds[0]]);
		}
	}

	/**
	 * Helper to capitalize the 1st letter of the given word
	 * @param {string} word
	 * @return capitalized word
	 */
	private capitalize(word) {
		if(word)
			return word.replace(/^\w/, c => c.toUpperCase());
	}

	/**
	 * Callback from ng-select on selecting an option in the breeds' dropdown
	 * Open the route with the corresponding breed
	 * @param {any} value
	 */
	public selected(value: any):void {
		this.navigateToRoute(value);
	}

	/**
	 * Set the title of the current HTML document.
	 * @param newTitle
	 */
	private setPageTitle(newTitle: string) { 
		this.pageTitle = newTitle;
	}
}