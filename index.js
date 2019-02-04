{
    type: 'ADD_TODO',
        todo: {
        id: 0,
            name: 'Learn Redux',
                complete: false,
    }
}

{
    type: 'REMOVE_TODO',
        id: 0,
}

{
    type: 'TOGGLE_TODO',
        id: 0,
}

{
    type: 'ADD_GOAL',
        goal: {
        id: 0,
            name: 'Run a marathon',
    }
}

{
    type: 'REMOVE_GOAL',
        id: 0,
}

/*
    Characteristics of a pure function
    1. The always return the same results if the same arguments are passed in.
    2. They depend only on the arguments passed into them.
    3. Never produce any side effects. (no ajax requests, do not mutate state, no interaction with the DOM (outside world))
*/

function todos(state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}

function createStore() {
    // The store should have four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to changes on the state
    // 4. UPdate the state

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    return {
        getState,
        subscribe,
    }
}