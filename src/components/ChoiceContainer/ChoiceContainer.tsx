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

/**
 * <ChoiceContainer> component to add choice input box in creation view
 */
export class ChoiceContainer extends React.PureComponent<IChoiceContainerProps> {

    constructor(props: IChoiceContainerProps) {
        super(props);
    }

    handleOnUpdateScale = e => {
        this.props.onUpdateScale(e.target.value);
    };

    handleOnUpdateExtension = e => {
        this.props.onUpdateExtension(e.target.checked);
    };

    render() {
        return (
            <div>
                <div className="pickTheScale">{Localizer.getString("PickTheScale")}:</div>
                <Flex>
                    <div className="equalWidth">
                    <input id="fibo" type="radio" value="fibo" name="scale" key={"option" + 0} onChange={this.handleOnUpdateScale} checked/>
                    <label htmlFor="fibo" className="element">Fibonacci</label>
                    </div>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice2.png"
                         alt="choice2" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice3.png"
                         alt="choice3" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice5.png"
                         alt="choice5" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice8.png"
                         alt="choice8" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice13.png"
                         alt="choice13" className="element"/>
                </Flex>
                <Flex>
                    <div className="equalWidth">
                    <input id="tshirts" type="radio" value="tshirts" name="scale" key={"option" + 1} onChange={this.handleOnUpdateScale}/>
                    <label htmlFor="tshirts" className="element">T-shirts</label>
                    </div>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXS.png"
                         alt="shirtXS" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtS.png"
                         alt="shirtS" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtM.png"
                         alt="shirtM" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtL.png"
                         alt="shirtL" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXL.png"
                         alt="shirtXL" className="element"/>
                </Flex>
                <Flex>
                    <div className="equalWidth">
                    <input type="checkbox" id="also" name="also" onChange={this.handleOnUpdateExtension}/>
                    <label htmlFor="also" className="element">I need also</label>
                    </div>
                    <img
                        src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceQuestionmark.png"
                        alt="choiceQuestionmark" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceInfinity.png"
                         alt="choiceInfinity" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceCoffe.png"
                         alt="choiceCoffe" className="element"/>
                </Flex>
            </div>
        );
    }
}
