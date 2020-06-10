import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HomeService } from './home.service';
import { LocalStorageService } from './../../services/shared/localstorage.service';
import { USER } from './../../utilities/constants/localstorage.constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	showLoading: boolean = false;
	registerForm: FormGroup;

	constructor(
		private router: Router,
		private homeService: HomeService,
		private localStorageService: LocalStorageService
	) {
		this.generateForm();
	}

	ngOnInit(): void {
	}

	generateForm(): void {
		this.registerForm = new FormGroup({
			name: new FormControl('', [Validators.required])
		});
	}

	submitForm(): void {
		this.showLoading = true;
		const reqBody = {
			name: this.registerForm.controls.name.value,
			isAdmin: true
		};

		this.homeService.createRoom(reqBody)
			.subscribe(response => {
				this.showLoading = false;

				// Set username to localstorage
				this.localStorageService.set(USER, reqBody);

				// Redirect only if username is successfully stored on localstorage
				if (this.localStorageService.get(USER))
					this.router.navigate(['/room', response.room_id]);
			}, err => {
				console.log(err);
			})
	}

	get f() {
		return this.registerForm.controls;
	}
}
