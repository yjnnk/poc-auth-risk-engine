// src/webComponent.ts
import ReactDOM from 'react-dom/client';
import React from 'react';
import App, { AppRef } from './App';

class RiskMFE extends HTMLElement {
  root: any;
  appRef: React.RefObject<AppRef>;

  constructor() {
    super();
    this.method1 = this.method1.bind(this);
    this.attachShadow({ mode: 'open' });

    // Initialize appRef
    this.appRef = React.createRef<AppRef>();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.shadowRoot!.appendChild(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint);
    this.root.render(<App ref={this.appRef} />);
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  method1(body: any) {
    console.log('method1');
    if (this.appRef.current && this.appRef.current.updateBody) {
      console.log('appRef?');
      console.log(this.appRef.current);
      this.appRef.current.updateBody(body);
    } else {
      console.log('appRef.current is undefined');
    }
    return body;
  }
}

customElements.define('risk-mfe', RiskMFE);

export { RiskMFE };