import {ComponentMeta, Story} from "@storybook/react";
import {
    BrowserRouterDecorator,
    ReduxStoreProviderDecorator
} from "../stories/ReduxStoreProviderDecorator";
import App from "./App";

export default {
    title: "components/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
} as ComponentMeta<typeof App>

const Template: Story = (args) => <App {...args}/>

export const AppExample = Template.bind({});
AppExample.args = {
    demoMode: true,
};

