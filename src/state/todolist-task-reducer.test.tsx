import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/todoist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = { "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: ""
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: ""
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: ""
            }
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: ""},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: ""},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: ""}
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

