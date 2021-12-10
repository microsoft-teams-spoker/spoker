import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {withThemeWrapper} from '../../../.storybook/utils';
import VoteCard, { VoteCardEnum } from './VoteCard';

export default {
    title: 'Simple/VoteCard',
    component: VoteCard,
    argTypes: {onClick: {action: 'clicked'}},
} as ComponentMeta<typeof VoteCard>;

const WithTheme = withThemeWrapper(VoteCard);

const Template: ComponentStory<typeof VoteCard> = (args) => <WithTheme {...args} />;

export const withError = Template.bind({});
withError.args = {
    card: VoteCardEnum.CARD_1,
    onClick: true
};
