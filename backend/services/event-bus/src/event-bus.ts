interface Events {
    [key: string]: Function[];
  }

class EventBus {
    events: Events; // Map events to the events interface
    public eventReceived: boolean;
    public eventEmitted: boolean

    constructor() {
        this.events = {};
        this.eventReceived = false;
        this.eventEmitted = false;
    }

    public onEventReceived(event: any, callback: Function) {

        if(!this.events[event]) {
            this.events[event] = []
        }

        else {
            this.eventReceived = true;
            this.events[event].push(callback);
        }


    }

    public emitEvent(event: any, currentData: any) { // Function to emit an event once an action has occurred
        const currentEvents = this.events[event];

        if (currentEvents) {
            this.eventEmitted = true;

            currentEvents.forEach(callback => {
            callback(currentData);
      });

    }


}}