import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChoiceContainer, IChoiceContainerOption } from './ChoiceContainer';
import { withThemeWrapper } from '../../../.storybook/utils';

const getItem = (index: number): IChoiceContainerOption => ({
    value: `Values ${index}`,
    // choicePrefix?: JSX.Element;
    choicePlaceholder: `choicePlaceholder ${index}`,
    deleteChoiceLabel: `deleteChoiceLabel ${index}`,
});

const items = new Array(5).fill(0).map((_, index) => getItem(index));

export default {
    title: 'Simple/ChoiceContainer',
    component: ChoiceContainer,
    argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof ChoiceContainer>;

const WithTheme = withThemeWrapper(ChoiceContainer);

const Template: ComponentStory<typeof ChoiceContainer> = (args) => <WithTheme {...args} />;

export const withTheme = Template.bind({});
withTheme.args = {
    // items: items,
    // totalQuantity: items.reduce((acc, curr) => acc + curr.quantity, 0),
    // // getBarPercentageString: (percentage: number) => `${percentage} - percentage`,
    // showShimmer: false,
    title: 'Optional title',
    options: items,
    optionsError: ['Err 1', 'Err 2', 'Err 3', 'Err 4', 'Err 5'],
    // limit?: number,
    // maxLength?: number,
    // renderForMobile?: boolean,
    // focusOnError?: boolean,
    // inputClassName?: string,
    // onUpdateChoice?: (i, value) => void,
    // onDeleteChoice?: (i) => void,
    // onAddChoice?: () => void,
};
