import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {InputBox} from './InputBox';

export default {
    title: 'Simple/InputBox',
    component: InputBox,

} as ComponentMeta<typeof InputBox>;

const Template: ComponentStory<typeof InputBox> = (args) => <InputBox {...args} />;

export const withError = Template.bind({});
withError.args = {
    multiline: true,
    prefixJSX: <>prefix</>,
    showError: true,
    errorText: 'Error text',
};

