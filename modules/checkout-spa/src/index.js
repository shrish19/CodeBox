import React from 'react';
import {createRoot} from 'react-dom/client';

import { App } from './App';

let container = false;

class WebComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		if (!container){
			createRoot(this).render(
				<App />
		)
		container = true;
	}
	}
}


const ELEMENT_ID = 'checkout-spa';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
