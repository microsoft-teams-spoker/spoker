// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import "./ChoiceContainer.scss";
import {Localizer} from "../../utils/Localizer";
import {Flex} from "@fluentui/react-northstar";
import {VoteCard, VoteCardEnum} from "../VoteCard/VoteCard";

export interface IChoiceContainerOption {
    value: string;
    choicePrefix?: JSX.Element;
    choicePlaceholder: string;
    deleteChoiceLabel: string;
}

export interface IChoiceContainerProps {
    title?: string;
    options: IChoiceContainerOption[];
    optionsError?: string[];
    limit?: number;
    maxLength?: number;
    renderForMobile?: boolean;
    focusOnError?: boolean;
    inputClassName?: string;
    onUpdateChoice?: (i, value) => void;
    onUpdateScale?: (value) => void;
    onUpdateExtension?: (value) => void;
}

type State = {
    scale: string;
}

/**
 * <ChoiceContainer> component to add choice input box in creation view
 */
export class ChoiceContainer extends React.PureComponent<IChoiceContainerProps, State> {

    constructor(props: IChoiceContainerProps) {
        super(props);
        this.state = {scale: "fibo"};

        this.handleOnUpdateScale = this.handleOnUpdateScale.bind(this);
    }

    handleOnUpdateScale = e => {
        this.setState({scale: e.target.value});
        this.props.onUpdateScale(e.target.value);
    };

    handleOnUpdateExtension = e => {
        this.props.onUpdateExtension(e.target.checked);
    };

    render() {
        return (
            <div>
                <div className="label">{Localizer.getString("PickTheScale")}:</div>
                <Flex className="row-scale">
                    <Flex className="equal-width">
                        <div className="first-scale-label">
                            <input id="fibo" type="radio" className="option" value="fibo" name="scale"
                                   key={"option" + 0} onChange={this.handleOnUpdateScale}
                                   checked={this.state.scale === "fibo"}/>
                            <label htmlFor="fibo">{Localizer.getString("Fibonacci")}</label>
                        </div>
                    </Flex>
                    <VoteCard card={VoteCardEnum.CARD_1} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_3} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_5} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_8} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_13} renderForMobile={this.props.renderForMobile}/>
                </Flex>
                <Flex className="row-scale">
                    <Flex className="equal-width">
                        <div className="second-scale-label">
                            <input id="tshirts" type="radio" className="option" value="tshirts" name="scale"
                                   key={"option" + 1} checked={this.state.scale === "tshirts"}
                                   onChange={this.handleOnUpdateScale}/>
                            <label htmlFor="tshirts">{Localizer.getString("Tshirts")}</label>
                        </div>
                    </Flex>
                    <VoteCard card={VoteCardEnum.CARD_XS} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_S} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_M} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_L} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_XL} renderForMobile={this.props.renderForMobile}/>
                </Flex>
                <Flex className="row-option">
                    <Flex className="equal-width">
                        <div className="option-label">
                            <input type="checkbox" className="option" id="also" name="also" onChange={this.handleOnUpdateExtension}/>
                            <label htmlFor="also">{Localizer.getString("OtherCards")}</label>
                        </div>
                    </Flex>
                    <VoteCard card={VoteCardEnum.CARD_QUESTIONMARK} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_INFINITY} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.CARD_COFFEE} renderForMobile={this.props.renderForMobile}/>
                </Flex>
            </div>
        );
    }
}
