import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

import { HomeService } from './home.service';
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
		private storage: StorageMap,
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
				this.storage.set(USER, reqBody).subscribe(() => { });

				// Redirect only if username is successfully stored on localstorage
				this.storage.get(USER).subscribe(userData => {
					if (userData)
						this.router.navigate(['/room', response.room_id]);
				});
			}, err => {
				console.log(err);
			})
	}

	get f() {
		return this.registerForm.controls;
	}
}
