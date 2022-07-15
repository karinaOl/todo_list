import {AddItemForm} from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "components/AddItemForm",
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: "callback"
        },
    },
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    callBack: action("Button clicked inside from")
}