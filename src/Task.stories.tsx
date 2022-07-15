import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

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
    task: {id: "12", isDone: true, title: "JS"},
    todoListID: "todoListID1"
}

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: "12", isDone: false, title: "JS"},
    todoListID: "todoListID2"
}