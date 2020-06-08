import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	constructor() { }

	set(key: string, data: any): void {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (err) {
			console.error('Error saving to localStorage', err);
		}
	}

	get(key: string) {
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (err) {
			console.error('Error getting data from localStorage', err);
			return null;
		}
	}
}
