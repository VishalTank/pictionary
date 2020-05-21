import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CopyService {

	constructor() { }

	copyToClipboard(inputElement, textToCopy: string): Promise<void> {
		inputElement.select();
		return navigator.clipboard.writeText(textToCopy);
	}
}
