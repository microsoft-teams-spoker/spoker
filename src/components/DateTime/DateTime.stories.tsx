import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DatePickerView } from './DatePickerView';
import { withThemeWrapper } from '../../../.storybook/utils';

export default {
    title: 'Simple/DatePickerView',
    component: DatePickerView,
    argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof DatePickerView>;

const WithTheme = withThemeWrapper(DatePickerView);

const Template: ComponentStory<typeof DatePickerView> = (args) => <WithTheme {...args} />;

export const withTheme = Template.bind({});
withTheme.args = {
    date: new Date('12/09/2021'),
    showCalendar: true,
};
