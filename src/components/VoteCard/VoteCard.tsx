import * as React from "react";
import "./VoteCard.scss";
import {VoteCardUtils} from "./VoteCardUtils";
import {Button} from "@fluentui/react-northstar";
import { thProperties } from "office-ui-fabric-react";

export enum VoteCardEnum {
    CARD_1,
    CARD_2,
    CARD_3,
    CARD_5,
    CARD_8,
    CARD_13,
    CARD_21,
    CARD_XS,
    CARD_S,
    CARD_M,
    CARD_L,
    CARD_XL,
    CARD_QUESTIONMARK,
    CARD_COFFEE,
    CARD_INFINITY,
}

export enum VoteCardType {
    FIBO,
    TSHIRT,
    OTHER,
}

export const FIBO_VOTE_CARDS = [
    VoteCardEnum.CARD_1,
    VoteCardEnum.CARD_3,
    VoteCardEnum.CARD_5,
    VoteCardEnum.CARD_8,
    VoteCardEnum.CARD_13,
];

export const TSHIRT_VOTE_CARDS = [
    VoteCardEnum.CARD_XS,
    VoteCardEnum.CARD_S,
    VoteCardEnum.CARD_M,
    VoteCardEnum.CARD_L,
    VoteCardEnum.CARD_XL,
];

export const OTHER_VOTE_CARDS = [
    VoteCardEnum.CARD_QUESTIONMARK,
    VoteCardEnum.CARD_COFFEE,
    VoteCardEnum.CARD_INFINITY,
];

export interface IVoteCardProps {
    card: VoteCardEnum;
    isSelected?: boolean;
    renderForMobile?: boolean;
    onClick?: (voteCardEnum: VoteCardEnum) => void;
}

export interface IVoteCardState {
}

/**
 * <VoteCard> Component to provide vote card
 */
export class VoteCard extends React.Component<IVoteCardProps, IVoteCardState> {

    constructor(props: IVoteCardProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            this.props.renderForMobile ? this.renderTimePickerForMobile() : this.renderTimePickerForWebOrDesktop()
        );
    }

    renderTimePickerForMobile() {
        return this.renderTimePickerForWebOrDesktop();
    }

    renderTimePickerForWebOrDesktop() {
        if (this.props.onClick) {

            if (this.props.isSelected) {
                return <Button
                    iconOnly
                    className="selected-button"
                    onClick={(e) => this.props.onClick(this.props.card)}
                    text>
                    <img src={this.getUrl()} alt={this.getName()} className="button-card"/>
                </Button>;
            } else {
                return <Button
                    iconOnly
                    className="button"
                    onClick={(e) => this.props.onClick(this.props.card)}
                    text>
                    <img src={this.getUrl()} alt={this.getName()} className="button-card"/>
                </Button>;
            }
        } else {
            return <img src={this.getUrl()} alt={this.getName()} className="card"/>;
        }
    }
    getUrl(): string {
        let path = "images/custom/";
        switch (this.getType()) {
            case VoteCardType.FIBO:
                path += "choice";
                break;
            case VoteCardType.TSHIRT:
                path += "shirt";
                break;
            case VoteCardType.OTHER:
                path += "choice";
                break;
        }
        return path + this.getName() + ".png";
    }

    getName(): string {
        switch (this.props.card) {
            case VoteCardEnum.CARD_1:
                return "1";
            case VoteCardEnum.CARD_2:
                return "2";
            case VoteCardEnum.CARD_3:
                return "3";
            case VoteCardEnum.CARD_5:
                return "5";
            case VoteCardEnum.CARD_8:
                return "8";
            case VoteCardEnum.CARD_13:
                return "13";
            case VoteCardEnum.CARD_21:
                return "21";
            case VoteCardEnum.CARD_XS:
                return "XS";
            case VoteCardEnum.CARD_S:
                return "S";
            case VoteCardEnum.CARD_M:
                return "M";
            case VoteCardEnum.CARD_L:
                return "L";
            case VoteCardEnum.CARD_XL:
                return "XL";
            case VoteCardEnum.CARD_QUESTIONMARK:
                return "Questionmark";
            case VoteCardEnum.CARD_COFFEE:
                return "Coffee";
            case VoteCardEnum.CARD_INFINITY:
                return "Infinity";
            default:
                throw new Error("Unknown vote card: " + this.props.card);
        }
    }

    getType(): VoteCardType {
        return VoteCardUtils.getType(this.props.card);
    }
}
