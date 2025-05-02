export {};

interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: Handling request.");
  }
}

class ProxyPat implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Checking access...");
    return true;
  }

  private logAccess(): void {
    console.log("Proxy: Logging the time of request.");
  }
}

const realSubject = new RealSubject();
const proxy = new ProxyPat(realSubject);

proxy.request();