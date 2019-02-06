/*
    Characteristics of a pure function
    1. The always return the same results if the same arguments are passed in.
    2. They depend only on the arguments passed into them.
    3. Never produce any side effects. (no ajax requests, do not mutate state, no interaction with the DOM (outside world))
*/

// Reducer function
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO':
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete })
            )
        default:
            return state
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case 'ADD_GOAL':
            return state.concat([goal.action])
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id)
        default:
            state
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

/*
    {
        todos: [],
        goals: []
    }
*/
function createStore(reducer) {
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

    const dispatch = (action) => {
        // call todos
        // loop over listeners and invoke them
        state = reducer(state, action)

        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

const store = createStore(app)

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
    }
})