import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {addTodoListAC, setTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todoist-api";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: "", entityStatus: "idle"
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: "", entityStatus: "idle"
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: "", entityStatus: "idle"
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: "", entityStatus: "idle"
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: "", entityStatus: "idle"
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", addedDate: "", order: 0,
                priority: TaskPriorities.Low, description: "", entityStatus: "idle"
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskID: "2", todolistID: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);

});

test('correct task should be added to correct array', () => {

    const newTask = {
        id: "1", title: "juce", status: TaskStatuses.New, todoListId: "todolistId2",
        startDate: "", deadline: "", addedDate: "", order: 0,
        priority: TaskPriorities.Low, description: ""
    }

    const action = addTaskAC({task: newTask});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const newTask = {
        id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
        startDate: "", deadline: "", addedDate: "", order: 0,
        priority: TaskPriorities.Low, description: ""
    }

    const action = updateTaskAC({taskID: "2", todolistID: "todolistId2", updatedTask: newTask});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const newTask = {
        id: "2", title: "sugar", status: TaskStatuses.Completed, todoListId: "todolistId2",
        startDate: "", deadline: "", addedDate: "", order: 0,
        priority: TaskPriorities.Low, description: ""
    }

    const action = updateTaskAC({taskID: "2", todolistID: "todolistId2", updatedTask: newTask});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("sugar");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

    const action = setTodolistAC({
        todolists: [
            {id: "todoList_ID1", title: "What to learn", addedDate: "", order: 0},
            {id: "todoList_ID2", title: "What to buy", addedDate: "", order: 0},
        ]
    });
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todoList_ID1"]).toStrictEqual([]);
    expect(endState["todoList_ID2"]).toStrictEqual([]);
});





