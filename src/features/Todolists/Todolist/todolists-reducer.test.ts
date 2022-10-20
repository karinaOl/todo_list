import {
    addTodoListAC,
    changeFilterValueAC, FilterValueType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer,
    updateTodoListAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../../api/todoist-api";



let todolistId1: string
let todolistId2: string

let startState: Array<TodolistDomainType>

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:"", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:"", order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({todolistID: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const newTodoList: TodolistType = {id: v1(), title: "New TodoList", addedDate: "", order: 0};

    const endState = todolistsReducer(startState, addTodoListAC({todolist: newTodoList},))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New TodoList");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, updateTodoListAC({todolistID: todolistId2, title: newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";
    const endState = todolistsReducer(startState, changeFilterValueAC({todolistID: todolistId2, filter: newFilter}))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



