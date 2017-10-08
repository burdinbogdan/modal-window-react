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
}, ]



export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_STATE":
            return [...state, { id: action.id, typeId: 1 }];

        case "CHANGE_STATE":
            return state.map((state) => {
                if (state.id == action.changedState.id) {
                    return action.changedState;
                }
                return state;
            });

        case "REMOVE_STATE":
            return state.filter((s) => s.id != action.id);

        default:
            return state;
    }
};