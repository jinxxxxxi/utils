class Subject {

    constructor() {
      this.observerList = [];
    }
  
    addObserver(observer) {
      this.observerList.push(observer);
    }
  
    removeObserver(observer) {
      const index = this.observerList.findIndex(o => o.name === observer.name);
      this.observerList.splice(index, 1);
    }
  
    notifyObservers(message) {
      const observers = this.observeList;
      observers.forEach(observer => observer.notified(message));
    }
  
}
  
class Observer {

    constructor(name, subject) {
      this.name = name;
      if (subject) {
        subject.addObserver(this);
      }
    }
  
    notified(message) {
      console.log(this.name, 'got message', message);
    }
}
  
const subject = new Subject();
const observerA = new Observer('observerA', subject);
const observerB = new Observer('observerB');
subject.addObserver(observerB);
subject.notifyObservers('Hello from subject');
subject.removeObserver(observerA);
subject.notifyObservers('Hello again');