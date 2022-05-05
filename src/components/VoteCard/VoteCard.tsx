import * as React from "react";
import "./VoteCard.scss";
import {VoteCardUtils} from "./VoteCardUtils";
import {Button} from "@fluentui/react-northstar";
import { thProperties } from "office-ui-fabric-react";

export enum VoteCardEnum {
    C1,
    C2,
    C3,
    C5,
    C8,
    C13,
    C21,
    XS,
    S,
    M,
    L,
    XL,
    QUESTIONMARK,
    COFFEE,
    INFINITY,
}

export enum VoteCardType {
    FIBO,
    TSHIRT,
    OTHER,
}

export const FIBO_VOTE_CARDS = [
    VoteCardEnum.C1,
    VoteCardEnum.C3,
    VoteCardEnum.C5,
    VoteCardEnum.C8,
    VoteCardEnum.C13,
];

export const TSHIRT_VOTE_CARDS = [
    VoteCardEnum.XS,
    VoteCardEnum.S,
    VoteCardEnum.M,
    VoteCardEnum.L,
    VoteCardEnum.XL,
];

export const OTHER_VOTE_CARDS = [
    VoteCardEnum.QUESTIONMARK,
    VoteCardEnum.COFFEE,
    VoteCardEnum.INFINITY,
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
            case VoteCardEnum.C1:
                return "1";
            case VoteCardEnum.C2:
                return "2";
            case VoteCardEnum.C3:
                return "3";
            case VoteCardEnum.C5:
                return "5";
            case VoteCardEnum.C8:
                return "8";
            case VoteCardEnum.C13:
                return "13";
            case VoteCardEnum.C21:
                return "21";
            case VoteCardEnum.XS:
                return "XS";
            case VoteCardEnum.S:
                return "S";
            case VoteCardEnum.M:
                return "M";
            case VoteCardEnum.L:
                return "L";
            case VoteCardEnum.XL:
                return "XL";
            case VoteCardEnum.QUESTIONMARK:
                return "Questionmark";
            case VoteCardEnum.COFFEE:
                return "Coffee";
            case VoteCardEnum.INFINITY:
                return "Infinity";
            default:
                throw new Error("Unknown vote card: " + this.props.card);
        }
    }

    getType(): VoteCardType {
        return VoteCardUtils.getType(this.props.card);
    }
}
