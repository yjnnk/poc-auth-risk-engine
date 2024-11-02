// src/webComponent.ts
import ReactDOM from 'react-dom/client';
import React from 'react';
import App, { AppRef } from './App';

class RiskMFE extends HTMLElement {
  root: any;
  appRef: React.RefObject<AppRef>;

  constructor() {
    super();
    this.setChallegeOnRiskMFE = this.setChallegeOnRiskMFE.bind(this);

    this.attachShadow({ mode: 'open' });

    // Initialize appRef
    this.appRef = React.createRef<AppRef>();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.shadowRoot!.appendChild(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint);
    this.root.render(<App ref={this.appRef} />);
    (window as any).setChallegeOnRiskMFE = this.setChallegeOnRiskMFE;

  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }

    delete (window as any).method1
  }


  setChallegeOnRiskMFE(body: any) {
    
    if (this.appRef.current && this.appRef.current.selectChallenge) {
      
      this.appRef.current.selectChallenge(body);
    } else {
      console.log('appRef.current is undefined');
    }
    return body;
  }
}

customElements.define('risk-mfe', RiskMFE);

export { RiskMFE };