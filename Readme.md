# Traffic Light Challenge

![Traffic Light](/docs/traffic-light.png)

For this challenge we'd like to see the following:

1. Understanding of the concept of "finite state machines";
2. Being able to implement the idea of a state machine in a web page;
3. Using a (well documented) package/library to solve a problem.


# States

A traffic light is a great example for a state machine.
The traffic light can (normally) only be in only one state.
The light is either Green, Yellow or Red. It can never be two colors at the same time.

## Regular states

1. The traffic light starts with a **Green** light;
2. After 5 seconds the traffic light turns **Yellow**;
3. After 2 seconds the traffic light turns **Red**;
4. After 5 seconds the traffic light turns **Green** again, etc.

## Emergency state

There is a special case where emergency services, like police and ambulances can temporarily override a traffic light state.\
They can remotely press a button and put the traffic light in an "emergency state".
This means the Yellow light blinks 5 times. This gives them the opportunity to safely pass the crossing.


![Visualization](/docs/visualization.gif)

## Requirements

1. Create the HTML, Css and Javascript to visualize a working traffic light;
2. Use XState to power the state machine;
3. Add a button which acts as an emergency override. Pressing this button must enable trigger the emergency state;
4. Try to use vanilla JavaScript for this case and not rely on frameworks and libraries like Vue or React.

## References

- https://xstate.js.org/docs/

 