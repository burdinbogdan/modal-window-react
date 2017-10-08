import { createStore } from 'redux';

const initialState = [{
    id: 1,
    type: "Single",
    num: 1
}, {
    id: 2,
    type: "Double",
    num: 2
}, {
    id: 3,
    type: "Twin",
    num: 22
}, {
    id: 4,
    type: "Tripple",
    num: 12
}, {
    id: 5,
    type: "Quadro",
    num: 4
}]

export default function(state = initialState, action) {
    return state;
};