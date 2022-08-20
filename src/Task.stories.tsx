import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "./api/todoist-api";

export default {
    title: "components/Task",
    component: Task,
    args: {
        changeCheckbox: action("changeCheckbox"),
        removeTask: action("removeTask"),
        updateTask: action("updateTask")
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: "12",
        status: TaskStatuses.Completed,
        title: "JS",
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: ""
    },
    todoListID: "todoListID1"
}

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: "12",
        status: TaskStatuses.New,
        title: "JS",
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: ""
    },
    todoListID: "todoListID2"
}