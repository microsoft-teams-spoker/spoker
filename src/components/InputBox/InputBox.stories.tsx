import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputBox } from './InputBox';
import { withThemeWrapper } from '../../../.storybook/utils';

export default {
    title: 'Simple/InputBox',
    component: InputBox,
} as ComponentMeta<typeof InputBox>;

const WithTheme = withThemeWrapper(InputBox);

const Template: ComponentStory<typeof InputBox> = (args) => <WithTheme {...args} />;

export const withError = Template.bind({});
withError.args = {
    multiline: true,
    prefixJSX: <>prefix</>,
    showError: true,
    errorText: 'Error text',
};
