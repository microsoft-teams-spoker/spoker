import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {withThemeWrapper} from '../../../.storybook/utils';
import {TableComponent} from "./TableComponent";

export default {
    title: 'Simple/TableComponent',
    component: TableComponent,
    argTypes: {onClick: {action: 'clicked'}},
} as ComponentMeta<typeof TableComponent>;

const WithTheme = withThemeWrapper(TableComponent);

const Template: ComponentStory<typeof TableComponent> = (args) => <WithTheme {...args} />;

export const withError = Template.bind({});
withError.args = {
    scale: 'fibo',
    allUsersPolls: [{user: {id: 1, displayName: "User 1"}, responseIds: {0: 1}}],
    showShimmer: false,
};
