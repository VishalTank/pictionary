import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { API } from '../../utilities/constants/api.constants';
import { HomeService } from './home.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	registerForm: FormGroup;

	constructor(
		private router: Router,
		private homeService: HomeService
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
		this.homeService.createRoom(this.registerForm.controls.name.value)
			.subscribe(response => {
				this.router.navigate(['/room', response.room_id]);
			}, err => {
				console.log(err);
			})
	}

	get f() {
		return this.registerForm.controls;
	}
}
