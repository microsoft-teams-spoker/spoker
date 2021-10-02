import { Table } from "@fluentui/react-northstar"
import * as React from "react"
import "./TableComponent.scss";


const fiboItems = [
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice2.png" alt="choice2" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice3.png" alt="choice3" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice5.png" alt="choice5" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice8.png" alt="choice8" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice13.png" alt="choice13" className="element"/>
];

const tshirtItems = [
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXS.png" alt="shirtXS" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtS.png" alt="shirtS" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtM.png" alt="shirtM" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtL.png" alt="shirtL" className="element"/>,
    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXL.png" alt="shirtXL" className="element"/>
];

const fiboHeader = {
    items: [
        <p className="headerText participants">Participants</p>,
        ...fiboItems,
        <p className="headerText">Other cards</p>
    ],
};

const tshirtsHeader = {
    items: [
        <p className="headerText participants">Participants</p>,
        ...tshirtItems,
        <p className="headerText">Other cards</p>
    ],
};

export interface ITableComponentProps {
    scale: string;
    allUsersPolls: ITableItem[];
    showShimmer?: boolean;
}

export interface ITableItem {
    user: actionSDK.SubscriptionMember, 
    responseIds: {[key:string]: string}
}

/**
 * <TableComponent> component to show all users pools
 */
export class TableComponent extends React.PureComponent<ITableComponentProps> {

    render() {
        let header = fiboHeader;
        if (this.props.scale !== "fibo") {
            header = tshirtsHeader;
        }

        let counterArray: number[] = getDefaultCounterArray();
        let rows: {key: number, items: JSX.Element[]}[] = [];

        for (let index = 0; index < this.props.allUsersPolls.length; index++) {
            const userPoll = this.props.allUsersPolls[index];
            if (userPoll.responseIds) {
                let defaultItems: JSX.Element[] = fiboItems;
                if (this.props.scale !== "fibo") {
                    defaultItems = tshirtItems;
                }
    
                rows[index] = {
                    key: index,
                    items: [
                        <p className="headerText">{userPoll.user.displayName}</p>,
                        <p></p>,
                        <p></p>,
                        <p></p>,
                        <p></p>,
                        <p></p>,
                        <p></p>
                    ]
                };

                let place = parseInt(userPoll.responseIds['0']);
                rows[index].items[place+1] = defaultItems[place];
                counterArray[place] = counterArray[place] + 1;
            }
        }

        rows[this.props.allUsersPolls.length] = {
            key: this.props.allUsersPolls.length,
            items: [
                <p className="headerText">Results</p>,
                <p className="headerText">{counterArray[0]}</p>,
                <p className="headerText">{counterArray[1]}</p>,
                <p className="headerText">{counterArray[2]}</p>,
                <p className="headerText">{counterArray[3]}</p>,
                <p className="headerText">{counterArray[4]}</p>,
                <p className="headerText">{counterArray[5]}</p>,
            ]
        }
        return (
            <Table header={header} rows={rows} aria-label="Static table" />
        );
    }
}

function getDefaultCounterArray(): number[] {
    let array = [];

    for (let index = 0; index < 6; index++) {
        array[index] = 0;
    }
    return array;
}
