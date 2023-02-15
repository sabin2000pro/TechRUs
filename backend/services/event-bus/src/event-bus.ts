class EventBus {
    events: {};

    constructor() {
        this.events = {}
    }

    onEventReceived(event, callback) {

        if(!this.events[event]) {
            this.events[event] = []
        }

        else {
            this.events[event].push(callback);
        }


    }

    emitEvent(event, currentData) { // Function to emit an event once an action has occurred
        const currentEvents = this.events[event];

        if (currentEvents) {
            currentEvents.forEach(callback => {
            callback(currentData);
      });

    }


}}