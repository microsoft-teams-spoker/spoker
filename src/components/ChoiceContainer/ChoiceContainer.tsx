// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import "./ChoiceContainer.scss";

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

    constructor(props: IChoiceContainerProps) {
        super(props);
        this.props.onUpdateChoice(0, "fibo");
        this.props.onUpdateChoice(1, "false");
    }

    handleChange = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });

        if (name === "scale") {
            this.props.onUpdateChoice(0, value);
        }
        if (name === "also") {
            this.props.onUpdateChoice(1, value);
        }
    }

    render() {
        return (
            <div>
                <div className="pickTheScale">Pick the scale:</div>
                <div className="box first">
                    <input id="fibo" type="radio" value="fibo" name="scale" key={"option" + 0} onChange={this.handleChange} checked/>
                    <label htmlFor="fibo" className="element equalWidth">Fibonacci</label>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice2.png" alt="choice2" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice3.png" alt="choice3" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice5.png" alt="choice5" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice8.png" alt="choice8" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choice13.png" alt="choice13" className="element"/>
                </div>
                <div className="box second">
                    <input id="tshirts" type="radio" value="tshirts" name="scale" key={"option" + 1} onChange={this.handleChange}/>
                    <label htmlFor="tshirts" className="element equalWidth">T-shirts</label>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXS.png" alt="shirtXS" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtS.png" alt="shirtS" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtM.png" alt="shirtM" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtL.png" alt="shirtL" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/shirtXL.png" alt="shirtXL" className="element"/>
                </div>
                <div className="box third">
                    <input type="checkbox" id="also" name="also" onChange={this.handleChange}/>
                    <label htmlFor="also" className="element equalWidth">I need also</label>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceQuestionmark.png" alt="choiceQuestionmark" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceInfinity.png" alt="choiceInfinity" className="element"/>
                    <img src="https://raw.githubusercontent.com/microsoft-teams-spoker/spoker/master-without-storybook/assets/images/custom/choiceCoffe.png" alt="choiceCoffe" className="element"/>
                </div>
            </div>
        );
    }
}
