// observers/InvoiceObserver.ts
interface Observer {
  update(): void;
}

class InvoiceObserver implements Observer {
  update() {
    // Lógica para reaccionar a cambios en las facturas
  }
}

class InvoiceSubject {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }
}

export type { Observer, InvoiceObserver, InvoiceSubject };
