import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditSpan";

export default {
    title: "components/EditableSpan",
    component: EditableSpan,
    argTypes: {
        callBack: {
            description: "Change EditableSpan value callback",
        },
        title: {
            defaultValue: "HTML",
            description: "EditableSpan start value",
        },
    },
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanFormStory = Template.bind({});

EditableSpanFormStory.args = {
    callBack: action("EditableSpan value changed")
}