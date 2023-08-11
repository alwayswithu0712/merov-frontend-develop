import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table, { VARIANT } from './index';
import { STATUS } from '../../../typings/user';

export default {
    title: 'components/Table',
    component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const TableHorizontal = Template.bind({});
TableHorizontal.args = {
    variant: VARIANT.HORIZONTAL,
    data: [
        {
            title: 'Details',
            text: 'Dolore magna aliqua. Lorem ipsum dolor sit amet,',
        },
        {
            title: 'Condition',
            text: 'New',
        },
        {
            title: 'Category',
            text: 'Hardware > GPU',
        },
        {
            title: 'Model',
            text: 'GIgabity',
        },
    ],
};

export const TableVertical = Template.bind({});
TableVertical.args = {
    variant: VARIANT.VERTICAL,
    tableHead: ['Full Names', 'Email', 'Status', 'phone', ''],
    data: [
        ['Nicolas Cage', 'niccage@gmail.com', `${STATUS.Full}`, "'+3677414254247"],
        ['Robert De Niro', 'elrobert@merov.io', `${STATUS.Rejected}`, "'+3677414254247"],
        ['Lucho De Niro', 'Lucho@merov.io', `${STATUS.Rejected}`, "'+3677414254247"],
    ],
};
