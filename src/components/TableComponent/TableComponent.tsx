import {Table} from "@fluentui/react-northstar";
import * as React from "react";
import "./TableComponent.scss";
import {FIBO_VOTE_CARDS, TSHIRT_VOTE_CARDS, VoteCard, VoteCardEnum, VoteCardType} from "../VoteCard/VoteCard";
import {VoteCardUtils} from "../VoteCard/VoteCardUtils";

function getDefaultCounterArray(): number[] {
    return new Array(6).fill(0);
}

export interface ITableComponentProps {
    scale: string;
    allUsersPolls: ITableItem[];
    showShimmer?: boolean;
}

export interface ITableItem {
    user: actionSDK.SubscriptionMember;
    responseIds: { [key: string]: string };
}

/**
 * <TableComponent> component to show all users pools
 */
export default class TableComponent extends React.PureComponent<ITableComponentProps> {

    render() {
        if (!this.props.scale) {
            return null;
        }
        const type = this.props.scale === "fibo" ? VoteCardType.FIBO : VoteCardType.TSHIRT;
        const voteCardEnums = type == VoteCardType.FIBO ? FIBO_VOTE_CARDS : TSHIRT_VOTE_CARDS;

        const header = {
            items: [
                <p className="headerText participants">Participants</p>,
                ...voteCardEnums.map(voteCardEnum => <VoteCard card={voteCardEnum}/>),
                <p className="headerText">Other cards</p>
            ],
        };
  
        const counterArray: number[] = getDefaultCounterArray();
        const rows: { key: number, items: JSX.Element[] }[] = [];

        this.props.allUsersPolls.forEach((userPoll, index) => {
            if (userPoll.responseIds) {
                rows[index] = {
                    key: index,
                    items: [
                        <p className="participant-text">{userPoll.user.displayName}</p>,
                        ...voteCardEnums.map(() => <p></p>),
                        <p></p>
                    ]
                };

                const voteCardEnum: VoteCardEnum = parseInt(userPoll.responseIds['0']);
                if (VoteCardUtils.getType(voteCardEnum) === VoteCardType.OTHER) {
                    rows[index].items[voteCardEnums.length + 1] = <VoteCard card={voteCardEnum}/>;
                    counterArray[voteCardEnums.length] = counterArray[voteCardEnums.length] + 1;
                } else {
                    const position = voteCardEnums.indexOf(voteCardEnum);
                    rows[index].items[position + 1] = <VoteCard card={voteCardEnum}/>;
                    counterArray[position] = counterArray[position] + 1;
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