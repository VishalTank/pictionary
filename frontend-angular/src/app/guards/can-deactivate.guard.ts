import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { RoomComponent } from './../modules/room/room.component';

@Injectable({
	providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<RoomComponent> {
	canDeactivate(
		component: RoomComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return false;
	}
}
