import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomComponent } from './room.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';


const routes: Routes = [
	{
		path: ':id',
		component: RoomComponent,
		canDeactivate: [CanDeactivateGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoomRoutingModule { }
