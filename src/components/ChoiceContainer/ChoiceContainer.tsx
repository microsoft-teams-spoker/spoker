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
    scale?: string;
    extension?: boolean;
    limit?: number;
    maxLength?: number;
    renderForMobile?: boolean;
    focusOnError?: boolean;
    inputClassName?: string;
    onUpdateChoice?: (i, value) => void;
    onUpdateScale?: (value) => void;
    onUpdateExtension?: (value) => void;
}

/**
 * <ChoiceContainer> component to add choice input box in creation view
 */
export class ChoiceContainer extends React.PureComponent<IChoiceContainerProps> {

    constructor(props: IChoiceContainerProps) {
        super(props);
        this.handleOnUpdateScale = this.handleOnUpdateScale.bind(this);
    }

    handleOnUpdateScale = e => {
        this.props.onUpdateScale(e.target.value);
    }

    handleOnUpdateExtension = e => {
        this.props.onUpdateExtension(e.target.checked);
    }

    render() {
        return (
            <div>
                <div className="label">{Localizer.getString("PickTheScale")}:</div>
                <Flex className="row-scale">
                    <Flex className="equal-width">
                        <div className="first-scale-label">
                            <input id="fibo" type="radio" className="option" value="fibo" name="scale"
                                   key={"option" + 0} onChange={this.handleOnUpdateScale}
                                   checked={this.props.scale === "fibo"}/>
                            <label htmlFor="fibo">{Localizer.getString("Fibonacci")}</label>
                        </div>
                    </Flex>
                    <VoteCard card={VoteCardEnum._1} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum._3} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum._5} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum._8} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum._13} renderForMobile={this.props.renderForMobile}/>
                </Flex>
                <Flex className="row-scale">
                    <Flex className="equal-width">
                        <div className="second-scale-label">
                            <input id="tshirts" type="radio" className="option" value="tshirts" name="scale"
                                   key={"option" + 1} checked={this.props.scale === "tshirts"}
                                   onChange={this.handleOnUpdateScale}/>
                            <label htmlFor="tshirts">{Localizer.getString("Tshirts")}</label>
                        </div>
                    </Flex>
                    <VoteCard card={VoteCardEnum.XS} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.S} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.M} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.L} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.XL} renderForMobile={this.props.renderForMobile}/>
                </Flex>
                <Flex className="row-option">
                    <Flex className="equal-width">
                        <div className="option-label">
                            <input type="checkbox" className="option" id="also" 
                            checked={this.props.extension} name="also" onChange={this.handleOnUpdateExtension}/>
                            <label htmlFor="also">{Localizer.getString("OtherCards")}</label>
                        </div>
                    </Flex>
                    <VoteCard card={VoteCardEnum.QUESTIONMARK} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.INFINITY} renderForMobile={this.props.renderForMobile}/>
                    <VoteCard card={VoteCardEnum.COFFEE} renderForMobile={this.props.renderForMobile}/>
                </Flex>
            </div>
        );
    }
}
