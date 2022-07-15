import {ComponentMeta, ComponentStory} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

export default {
    title: "components/AppWithRedux",
    component: AppWithRedux,
    decoration: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = (args) =><Provider store={store}> <AppWithRedux /></Provider>

export const AppWithReduxStory = Template.bind({});

