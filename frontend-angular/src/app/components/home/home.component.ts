import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	registerForm: FormGroup;
	roomLink: string = '';

	constructor(private homeService: HomeService) {
		this.generateForm();
	}

	ngOnInit(): void {
	}

	generateForm(): void {
		this.registerForm = new FormGroup({
			name: new FormControl('', [Validators.required])
		});
	}

	submitForm() {
		console.log('FORM VALUE:', this.registerForm.value);
		this.homeService.createRoom(this.registerForm.controls.name.value)
			.subscribe(response => {
				console.log('SUCCESS!!!!!!!!!!', response);
				this.roomLink = response.room_id;
			}, err => {
				console.log(err);
			})
	}

	get f() {
		return this.registerForm.controls;
	}
}
