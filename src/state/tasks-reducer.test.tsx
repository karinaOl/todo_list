import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodoListAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/todoist-api";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
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
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "sugar", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("sugar");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});





