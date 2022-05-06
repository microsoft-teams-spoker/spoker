// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {ChevronStartIcon, Flex, RadioGroup, Text} from "@fluentui/react-northstar";
import * as actionSDK from "@microsoft/m365-action-sdk";
import * as React from "react";
import {Localizer} from "../../utils/Localizer";
import {RadioGroupMobile} from "../RadioGroupMobile";
import {UxUtils} from "./../../utils/UxUtils";
import "./Settings.scss";

export interface ISettingsComponentProps {
    locale?: string;
    resultVisibility: actionSDK.Visibility;
    renderForMobile?: boolean;
    strings: ISettingsComponentStrings;
    onChange?: (props: ISettingsComponentProps) => void;
    onMount?: () => void;
    onBack?: () => void;
}

export interface ISettingsComponentStrings {
    resultsVisibleTo?: string;
    resultsVisibleToAll?: string;
    resultsVisibleToSender?: string;
}

/**
 * <Settings> Settings component of creation view of poll
 */
export class Settings extends React.PureComponent<ISettingsComponentProps> {
    private settingProps: ISettingsComponentProps;

    constructor(props: ISettingsComponentProps) {
        super(props);
    }

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount();
        }
    }

    render() {
        this.settingProps = {
            locale: this.props.locale,
            resultVisibility: this.props.resultVisibility,
            strings: this.props.strings
        };

        if (this.props.renderForMobile) {
            return this.renderSettings();
        } else {
            return (
                <Flex className="body-container" column gap="gap.medium">
                    {this.renderSettings()}
                    {this.props.onBack && this.getBackElement()}
                </Flex>
            );
        }
    }

    /**
     * Common to render settings view for both mobile and web
     */
    private renderSettings() {
        return (
            <Flex column>
                {this.renderResultVisibilitySection()}
            </Flex>
        );
    }

    /**
     * Rendering result visiblity radio button
     */
    private renderResultVisibilitySection() {

        let radioProps = {
            checkedValue: this.settingProps.resultVisibility,
            items: this.getVisibilityItems(this.getString("resultsVisibleToAll"), this.getString("resultsVisibleToSender")),
        };

        // handling radio group differently for mobile by using custom RadioGroupMobile component
        let radioComponent = this.props.renderForMobile ?
            <RadioGroupMobile {...radioProps} onCheckedValueChange={(value) => {
                this.settingProps.resultVisibility = value as actionSDK.Visibility;
                this.props.onChange(this.settingProps);
            }}></RadioGroupMobile> :
            <RadioGroup vertical {...radioProps} onCheckedValueChange={(e, props) => {
                this.settingProps.resultVisibility = props.value as actionSDK.Visibility;
                this.props.onChange(this.settingProps);
            }}/>;

        return (
            <Flex
                className="settings-item-margin"
                role="group"
                aria-label={this.getString("resultsVisibleTo")}
                column gap="gap.smaller">
                <label className="settings-item-title">{this.getString("resultsVisibleTo")}</label>
                <div className="settings-indentation">
                    {
                        radioComponent
                    }
                </div>
            </Flex>
        );
    }

    /**
     * Footer for settings view
     */
    private getBackElement() {
        return (
            <Flex className="footer-layout" gap={"gap.smaller"}>
                <Flex vAlign="center" className="pointer-cursor" {...UxUtils.getTabKeyProps()}
                      onClick={() => {
                          this.props.onBack();
                      }}
                >
                    <ChevronStartIcon xSpacing="after" size="small"/>
                    <Text content={Localizer.getString("Back")}/>
                </Flex>
            </Flex>
        );
    }

    private getString(key: string): string {
        if (this.props.strings && this.props.strings.hasOwnProperty(key)) {
            return this.props.strings[key];
        }
        return key;
    }

    private getVisibilityItems(resultsVisibleToAllLabel: string, resultsVisibleToSenderLabel: string) {
        return [
            {
                key: "1",
                label: resultsVisibleToAllLabel,
                value: actionSDK.Visibility.All,
                className: "settings-radio-item"
            },
            {
                key: "2",
                label: resultsVisibleToSenderLabel,
                value: actionSDK.Visibility.Sender,
                className: "settings-radio-item-last"
            },
        ];
    }
}
