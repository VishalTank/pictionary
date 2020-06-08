import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

	@Input() members;

	constructor() { }

	ngOnInit(): void {
	}

}
