import {Table} from "@fluentui/react-northstar";
import * as React from "react";
import "./TableComponent.scss";

const extraItems = [
    <img src="images/custom/choiceQuestionmark.png" alt="choiceQuestionmark" className="element"/>,
    <img src="images/custom/choiceCoffe.png" alt="choiceCoffe" className="element"/>,
    <img src="images/custom/choiceInfinity.png" alt="choiceInfinity" className="element"/>,
]

const fiboItemsBasic = [
    <img src="images/custom/choice2.png" alt="choice2" className="element"/>,
    <img src="images/custom/choice3.png" alt="choice3" className="element"/>,
    <img src="images/custom/choice5.png" alt="choice5" className="element"/>,
    <img src="images/custom/choice8.png" alt="choice8" className="element"/>,
    <img src="images/custom/choice13.png" alt="choice13" className="element"/>
]

const fiboItems = [
    ...fiboItemsBasic,
    ...extraItems
];

const tshirtItemsBasic = [
    <img src="images/custom/shirtXS.png" alt="shirtXS" className="element"/>,
    <img src="images/custom/shirtS.png" alt="shirtS" className="element"/>,
    <img src="images/custom/shirtM.png" alt="shirtM" className="element"/>,
    <img src="images/custom/shirtL.png" alt="shirtL" className="element"/>,
    <img src="images/custom/shirtXL.png" alt="shirtXL" className="element"/>
]

const tshirtItems = [
    ...tshirtItemsBasic,
    ...extraItems
];

const fiboHeader = {
    items: [
        <p className="headerText participants">Participants</p>,
        ...fiboItemsBasic,
        <p className="headerText">Other cards</p>
    ],
};

const tshirtsHeader = {
    items: [
        <p className="headerText participants">Participants</p>,
        ...tshirtItemsBasic,
        <p className="headerText">Other cards</p>
    ],
};

function getDefaultCounterArray(): number[] {
    return new Array(6).fill(0);
}

export interface ITableComponentProps {
    scale: string;
    allUsersPolls: ITableItem[];
    showShimmer?: boolean;
}

export interface ITableItem {
    user: actionSDK.SubscriptionMember,
    responseIds: { [key: string]: string }
}

/**
 * <TableComponent> component to show all users pools
 */
export class TableComponent extends React.PureComponent<ITableComponentProps> {

    render() {
        console.log(this.props.scale);
        const header = this.props.scale === "fibo" ? fiboHeader : tshirtsHeader;
        const defaultItems: JSX.Element[] = this.props.scale === "fibo" ? fiboItems : tshirtItems;

        const counterArray: number[] = getDefaultCounterArray();
        const rows: { key: number, items: JSX.Element[] }[] = [];

        this.props.allUsersPolls.forEach((user, index) => {
            const userPoll = this.props.allUsersPolls[index];
            if (userPoll.responseIds) {
                rows[index] = {
                    key: index,
                    items: [
                        <p className="headerText">{userPoll.user.displayName}</p>,
                        ...fiboItemsBasic.map(() => <p></p>),
                        <p></p>
                    ]
                };

                const place = parseInt(userPoll.responseIds['0']);
                if (place < 5) {
                    rows[index].items[place + 1] = defaultItems[place];
                    counterArray[place] = counterArray[place] + 1;
                } else if (place > 4) {
                    rows[index].items[6] = defaultItems[place];
                    counterArray[5] = counterArray[5] + 1;
                }

            }
        });

        rows[this.props.allUsersPolls.length] = {
            key: this.props.allUsersPolls.length,
            items: [
                <p className="headerText">Results</p>,
                ...counterArray.map((count) => <p className="headerText">{count}</p>)
            ]
        };
        return (
            <Table header={header} rows={rows} aria-label="Static table" className="votesTable"/>
        );
    }
}
