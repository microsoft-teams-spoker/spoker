import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {BarChartComponent, IBarChartItem} from './BarChartComponent';

const getItem = (index: number): IBarChartItem => ({
    title: `Title ${index}`,
    quantity: Math.floor(Math.random() * 20),
    id: `ID-${index}`,
    hideStatistics: false,
});

const items = new Array(5).fill(0).map((_, index) => getItem(index));

export default {
    title: 'Simple/BarChartComponent',
    component: BarChartComponent,
    argTypes: {onClick: {action: 'clicked'}},

} as ComponentMeta<typeof BarChartComponent>;

const Template: ComponentStory<typeof BarChartComponent> = (args) => <BarChartComponent {...args} />;

export const withError = Template.bind({});
withError.args = {
    items: items,
    totalQuantity: items.reduce((acc, curr) => acc + curr.quantity, 0),
    // getBarPercentageString: (percentage: number) => `${percentage} - percentage`,
    showShimmer: false,
};
