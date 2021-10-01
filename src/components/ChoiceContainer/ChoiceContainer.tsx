// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import "./ChoiceContainer.scss";
import { InputBox } from "../InputBox";
import { Text, ShorthandValue, AddIcon, BoxProps, TrashCanIcon } from "@fluentui/react-northstar";
import { UxUtils } from "./../../utils/UxUtils";
import { Constants } from "./../../utils/Constants";
import { Localizer } from "../../utils/Localizer";

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
    onDeleteChoice?: (i) => void;
    onAddChoice?: () => void;
}

/**
 * <ChoiceContainer> component to add choice input box in creation view
 */
export class ChoiceContainer extends React.PureComponent<IChoiceContainerProps> {

    private currentFocus: number = -1;
    private addButtonRef: HTMLElement;

    constructor(props: IChoiceContainerProps) {
        super(props);
    }

    /**
     * method that will add trash icon in input if count of choice is greater than 2 in Poll
     * @param i index of trash icon
     */
    getDeleteIconProps(i: number): ShorthandValue<BoxProps> {
        if (this.props.options.length > 2) {
            return {
                content: <TrashCanIcon className="choice-trash-can" outline={true} aria-hidden="false"
                    title={this.props.options[i].deleteChoiceLabel}
                    onClick={() => {
                        if (this.currentFocus == this.props.options.length - 1) {
                            setTimeout((() => {
                                this.addButtonRef.focus();
                            }).bind(this), 0);
                        }
                        this.props.onDeleteChoice(i);
                    }}
                />,
                ...UxUtils.getTabKeyProps()
            };
        }
        return null;
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div className="pickTheScale">Pick the scale:</div>
                <div className="box first">
                    <input id="fibo" type="radio" value="Fibonacci" name="scale" key={"option" + 0} onChange={this.handleChange} checked/>
                    <label htmlFor="fibo" className="element">Fibonacci</label>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice2.png" alt="choice2" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice3.png" alt="choice3" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice5.png" alt="choice5" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice8.png" alt="choice8" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice13.png" alt="choice13" className="element"/>
                </div>
                <div className="box second">
                    <input id="tshirts" type="radio" value="T-shirts" name="scale" key={"option" + 1} onChange={this.handleChange}/>
                    <label htmlFor="tshirts" className="element">T-shirts</label>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXS.png" alt="shirtXS" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtS.png" alt="shirtS" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtM.png" alt="shirtM" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtL.png" alt="shirtL" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXL.png" alt="shirtXL" className="element"/>
                </div>
                <div className="box third">
                    <input type="checkbox" id="also" name="scale" onChange={this.handleChange}/>
                    <label htmlFor="also" className="element">I need also</label>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceQuestionmark.png" alt="choiceQuestionmark" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceInfinity.png" alt="choiceInfinity" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceCoffe.png" alt="choiceCoffe" className="element"/>
                </div>
            </div>
        );
    }
}
