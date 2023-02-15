class EventBus {
    public events: {};

    constructor() {
        this.events = {}
    }

    public onEventReceived(event, callback) {

        if(!this.events[event]) {
            this.events[event] = []
        }

        else {
            this.events[event].push(callback);
        }


    }

    public emitEvent(event, currentData) { // Function to emit an event once an action has occurred
        const currentEvents = this.events[event];

        if (currentEvents) {
            currentEvents.forEach(callback => {
            callback(currentData);
      });

    }


}}