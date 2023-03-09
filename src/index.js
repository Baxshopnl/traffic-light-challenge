import { createMachine, interpret } from 'xstate';

// initialise traffic light, using 'after' to change states with interval
const trafficLight = createMachine({
  id: 'traffic-light',
  initial: 'defaultCycle',
  states: {
    defaultCycle: {
      on: {EMERGENCY: 'emergencyCycle'},
      initial: 'green',
      states: {
        green: {
          after: {
            5000: {target: 'yellow'}
          },
        },
        yellow: {
          after: {
            2000: {target: 'red'}
          },
        },
        red: {
          after: {
            5000: {target: 'green'}
          },
        },
      }
    },
    emergencyCycle: {
      initial: 'emergency',
      states: {
        emergency: {
          after: {
            // go to red light after the ambulance has passed, just for safety :-)
            5000: {target: '#traffic-light.defaultCycle.red'}
          }
        }
      }
    },
  }
});

// use xstate interpreter to run automated Timeout function
const service = interpret(trafficLight).onTransition((state) => {
  // add 'active' class to current state light
  if (state.value.defaultCycle){
    document.querySelector('.light.' + state.value.defaultCycle).classList.add('active')
  }

  // remove 'active' class from previous state light
  // (except with initial state or coming from emergencyCycle)
  if (state.history  && !state.history.value.emergencyCycle) {
    document.querySelector('.light.' + state.history.value.defaultCycle).classList.remove('active')
  }
});

service.start();


// emergency button functionality
const emergencyButton = document.querySelector('#emergencyButton');
const yellowLight = document.querySelector('.light.yellow');
const blinkenLichten = document.querySelector('.light.yellow.blinking');

emergencyButton.addEventListener('click', () => {
  // only run this code when yellow light is not already blinking
  if(!blinkenLichten){
    // go to emergencyCycle
    service.send('EMERGENCY')

    // add blinking class to yellow
    yellowLight.classList.add('blinking');

    // after 5 seconds, remove yellow blinking
    setTimeout(() => {
      yellowLight.classList.remove('blinking');
    }, 5000);
  }
})
