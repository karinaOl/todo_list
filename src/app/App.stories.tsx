import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import App from "./App";

export default {
    title: "components/App",
    component: App,
    decoration: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) =><Provider store={store}> <App /></Provider>

export const AppWithReduxStory = Template.bind({});

