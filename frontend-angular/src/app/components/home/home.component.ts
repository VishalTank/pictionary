import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { API } from '../../utilities/constants/api.constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	registerForm: FormGroup;
	roomLink: string = '';
	copyButtonBorder: string = 'secondary';

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

	submitForm(): void {
		console.log('FORM VALUE:', this.registerForm.value);
		this.homeService.createRoom(this.registerForm.controls.name.value)
			.subscribe(response => {
				this.roomLink = API.ROOM + response.room_id;
				this.copyButtonBorder = 'secondary';
			}, err => {
				console.log(err);
			})
	}

	get f() {
		return this.registerForm.controls;
	}

	copyToClipboard(inputElement): void {
		inputElement.select();
		navigator.clipboard.writeText(this.roomLink)
			.then(() => {
				console.log('copied to clipboard');
				this.copyButtonBorder = 'success';
			})
			.catch(err => {
				console.log(err);
				this.copyButtonBorder = 'danger';
			})
	}
}
