import { createStore } from 'redux';

const initialState = [{
    id: 1,
    typeId: 3
}, {
    id: 2,
    typeId: 4
}, {
    id: 3,
    typeId: 5
}, ];


let localState = JSON.parse(localStorage.getItem('localState'));

export default function(state = localState || initialState, action) {

    let newState;

    try {

        switch (action.type) {
            case "ADD_STATE":
                return newState = [...state, { id: action.id, typeId: 1 }];

            case "CHANGE_STATE":
                return newState = state.map((state) => {
                    if (state.id == action.changedState.id) {
                        return action.changedState;
                    }
                    return state;
                });

            case "REMOVE_STATE":
                return newState = state.filter((s) => s.id != action.id);

            case "RECOVERY_STATE":
                if(!localStorage.getItem('savedState'))
                    localStorage.setItem('savedState', JSON.stringify(state));
                return JSON.parse(localStorage.getItem('localState')) || state;

            case "SAVE_STATE":
                localStorage.setItem('savedState', JSON.stringify(state));
                return state;

            case "UNDO_STATE":
                newState = JSON.parse(localStorage.getItem('savedState'));
                return newState || state;

            default:
                return state;
        }
    } finally {
        localStorage.setItem('localState', JSON.stringify(newState || state));
    }
};