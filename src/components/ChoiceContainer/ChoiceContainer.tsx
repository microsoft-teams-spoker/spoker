// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import "./ChoiceContainer.scss";
import {Localizer} from "../../utils/Localizer";
import {ArrowLeftIcon, Button, Flex, FlexItem, Loader, SettingsIcon, Text} from "@fluentui/react-northstar";

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
                <Flex className="row">
                    <Flex className="equal-width">
                        <div className="first-scale-label">
                            <input id="fibo" type="radio" className="option" value="fibo" name="scale"
                                   key={"option" + 0} onChange={this.handleOnUpdateScale}
                                   checked={this.state.scale === "fibo"}/>
                            <label htmlFor="fibo">{Localizer.getString("Fibonacci")}</label>
                        </div>
                    </Flex>
                    <img src="images/custom/choice2.png"
                         alt="choice2" className="element"/>
                    <img src="images/custom/choice3.png"
                         alt="choice3" className="element"/>
                    <img src="images/custom/choice5.png"
                         alt="choice5" className="element"/>
                    <img src="images/custom/choice8.png"
                         alt="choice8" className="element"/>
                    <img src="images/custom/choice13.png"
                         alt="choice13" className="element"/>
                </Flex>
                <Flex className="row">
                    <Flex className="equal-width">
                        <div className="second-scale-label">
                            <input id="tshirts" type="radio" className="option" value="tshirts" name="scale"
                                   key={"option" + 1} checked={this.state.scale === "tshirts"}
                                   onChange={this.handleOnUpdateScale}/>
                            <label htmlFor="tshirts">{Localizer.getString("Tshirts")}</label>
                        </div>
                    </Flex>
                    <img src="images/custom/shirtXS.png"
                         alt="shirtXS" className="element"/>
                    <img src="images/custom/shirtS.png"
                         alt="shirtS" className="element"/>
                    <img src="images/custom/shirtM.png"
                         alt="shirtM" className="element"/>
                    <img src="images/custom/shirtL.png"
                         alt="shirtL" className="element"/>
                    <img src="images/custom/shirtXL.png"
                         alt="shirtXL" className="element"/>
                </Flex>
                <Flex className="row">
                    <Flex className="equal-width">
                        <div className="option-label">
                            <input type="checkbox" className="option" id="also" name="also" onChange={this.handleOnUpdateExtension}/>
                            <label htmlFor="also">{Localizer.getString("OtherCards")}</label>
                        </div>
                    </Flex>
                    <img
                        src="images/custom/choiceQuestionmark.png"
                        alt="choiceQuestionmark" className="element"/>
                    <img src="images/custom/choiceInfinity.png"
                         alt="choiceInfinity" className="element"/>
                    <img src="images/custom/choiceCoffe.png"
                         alt="choiceCoffe" className="element"/>
                </Flex>
            </div>
        );
    }
}
