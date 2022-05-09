// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {ArrowLeftIcon, Button, Flex, FlexItem, Loader, SettingsIcon, Text} from "@fluentui/react-northstar";
import * as actionSDK from "@microsoft/m365-action-sdk";
import {observer} from "mobx-react";
import * as React from "react";
import {ActionSdkHelper} from "../../helper/ActionSdkHelper";
import {Localizer} from "../../utils/Localizer";
import {Utils} from "../../utils/Utils";
import {ChoiceContainer, IChoiceContainerOption, IChoiceContainerProps} from "../ChoiceContainer";
import {ErrorView} from "../ErrorView";
import {InputBox} from "../InputBox";
import {INavBarComponentProps, NavBarComponent} from "../NavBarComponent";
import {
    callActionInstanceCreationAPI,
    goToPage,
    shouldValidateUI,
    updateChoiceText,
    updateExtension,
    updateScale,
    updateSettings,
    updateTitle
} from "./../../actions/CreationActions";
import getStore, {Page} from "./../../store/CreationStore";
import {Constants} from "./../../utils/Constants";
import {ProgressState} from "./../../utils/SharedEnum";
import {UxUtils} from "./../../utils/UxUtils";
import "./creation.scss";
import {ISettingsComponentProps, ISettingsComponentStrings, Settings} from "./Settings";

/**
 * <CreationPage> component for create view of poll app
 * @observer decorator on the component this is what tells MobX to rerender the component whenever the data it relies on changes.
 */
@observer
export default class CreationPage extends React.Component<any, any> {

    private settingsFooterComponentRef: HTMLElement;
    private validationErrorQuestionRef: HTMLElement;

    render() {
        let progressState = getStore().progressState;
        if (progressState === ProgressState.NotStarted || progressState == ProgressState.InProgress) {
            return <Loader/>;
        } else if (progressState === ProgressState.Failed) {
            ActionSdkHelper.hideLoadingIndicator();
            return (
                <ErrorView
                    title={Localizer.getString("GenericError")}
                    buttonTitle={Localizer.getString("Close")}
                />
            );
        } else {
            // Render View
            ActionSdkHelper.hideLoadingIndicator();
            if (UxUtils.renderingForMobile()) {
                // this will load the setting view where user can change result visibility
                if (getStore().currentPage === Page.Settings) {
                    return this.renderSettingsPageForMobile();
                } else {
                    return (
                        <Flex className="body-container no-mobile-footer">
                            {this.renderChoicesSection()}
                            <div className="settings-summary-mobile-container">
                                {this.renderFooterSection(true)}
                            </div>
                        </Flex>
                    );
                }
            } else {
                if (getStore().currentPage == Page.Settings) {
                    let settingsProps: ISettingsComponentProps = {
                        ...this.getCommonSettingsProps(),
                        onBack: () => {
                            goToPage(Page.Main);
                            setTimeout(
                                function () {
                                    if (this.settingsFooterComponentRef) {
                                        this.settingsFooterComponentRef.focus();
                                    }
                                }.bind(this),
                                0
                            );
                        }
                    };
                    return <Settings {...settingsProps} />;
                } else if (getStore().currentPage == Page.Main) {
                    return (
                        <>
                            <Flex gap="gap.medium" column className="body-container">
                                {this.renderChoicesSection()}
                            </Flex>
                            {this.renderFooterSection()}
                        </>
                    );
                }
            }
        }
    }

    /**
     * Method to render the input title box and choice input box
     */
    renderChoicesSection() {
        let questionEmptyError: string;
        let optionsError: string[] = [];
        let choiceOptions = [];
        let accessibilityAnnouncementString: string = "";
        let focusChoiceOnError: boolean = false;

        let i = 0;
        getStore().options.forEach((option) => {
            const choiceOption: IChoiceContainerOption = {
                value: option,
                choicePlaceholder: Localizer.getString("Choice", i + 1),
                deleteChoiceLabel: Localizer.getString("DeleteChoiceX", i + 1),
            };
            choiceOptions.push(choiceOption);
            i++;
        });

        let choiceProps: IChoiceContainerProps = {
            options: choiceOptions,
            scale: getStore().scale,
            extension: getStore().extension
        };
        Utils.announceText(accessibilityAnnouncementString);
        return (
            <Flex column>
                <Flex className="label-title-box">
                    <div className="label-title">{Localizer.getString("EnterStoryName")}:</div>
                    <InputBox
                        fluid multiline
                        maxLength={Constants.POLL_TITLE_MAX_LENGTH}
                        inputRef={(element) => {
                            this.validationErrorQuestionRef = element;
                        }}
                        input={{
                            className: "title-box"
                        }}
                        showError={questionEmptyError != null}
                        errorText={questionEmptyError}
                        value={getStore().title}
                        className="title-box"
                        placeholder={Localizer.getString("PollTitlePlaceholder")}
                        aria-placeholder={Localizer.getString("PollTitlePlaceholder")}
                        onChange={(e) => {
                            updateTitle((e.target as HTMLInputElement).value);
                            shouldValidateUI(false); // setting this flag to false to not validate input everytime value changes
                        }}
                    />
                </Flex>
                <ChoiceContainer optionsError={optionsError} limit={getStore().maxOptions}
                                 focusOnError={focusChoiceOnError}
                                 renderForMobile={UxUtils.renderingForMobile()}
                                 maxLength={Constants.POLL_CHOICE_MAX_LENGTH}
                                 onUpdateChoice={(i, value) => {
                                     updateChoiceText(i, value);
                                     shouldValidateUI(false);
                                 }}
                                 onUpdateScale={(value) => {
                                     updateScale(value);
                                     shouldValidateUI(false);
                                 }}
                                 onUpdateExtension={(value) => {
                                     updateExtension(value);
                                     shouldValidateUI(false);
                                 }}
                                 {...choiceProps}

                />
            </Flex>
        );
    }

    /**
     * Setting summary and button to switch from main view to settings view
     */
    renderFooterSettingsSection() {
        return (
            <div className="settings-summary-footer" {...UxUtils.getTabKeyProps()}
                 ref={(element) => {
                     this.settingsFooterComponentRef = element;
                 }}
                 onClick={() => {
                     goToPage(Page.Settings);
                 }}>
                <SettingsIcon className="settings-icon" outline={true} styles={({theme: {siteVariables}}) => ({
                    color: siteVariables.colorScheme.brand.foreground,
                })}/>
                <Text content={this.getSettingsSummary()} size="small" color="brand"/>
            </div>
        );
    }

    /**
     * Settings page view for mobile
     */
    renderSettingsPageForMobile() {
        let navBarComponentProps: INavBarComponentProps = {
            title: Localizer.getString("Settings"),
            leftNavBarItem: {
                icon: <ArrowLeftIcon/>,
                ariaLabel: Localizer.getString("Back"),
                onClick: () => {
                    goToPage(Page.Main);
                    setTimeout(() => {
                        if (this.settingsFooterComponentRef) {
                            this.settingsFooterComponentRef.focus();
                        }
                    }, 0);
                },
            },
        };

        return (
            <Flex className="body-container no-mobile-footer" column>
                <NavBarComponent {...navBarComponentProps} />
                <Settings {...this.getCommonSettingsProps()} />
            </Flex>
        );
    }

    /**
     * Helper function to provide footer for main page
     * @param isMobileView true or false based of whether its for mobile view or not
     */
    renderFooterSection(isMobileView?: boolean) {
        let className = isMobileView ? "" : "footer-layout";
        return (
            <Flex className={className} gap={"gap.smaller"}>
                {this.renderFooterSettingsSection()}
                <FlexItem push>
                    <Button
                        primary
                        loading={getStore().sendingAction}
                        disabled={getStore().sendingAction}
                        content={Localizer.getString("Next")}
                        onClick={() => {
                            callActionInstanceCreationAPI();
                        }}>
                    </Button>
                </FlexItem>
            </Flex>
        );
    }

    /**
     * method to get the setting summary from selected result visibility
     */
    getSettingsSummary(): string {
        let resultVisibility = getStore().settings.resultVisibility;

        if (resultVisibility) {
            let visibilityString: string = resultVisibility == actionSDK.Visibility.All
                ? "ResultsVisibilitySettingsSummaryEveryone" : "ResultsVisibilitySettingsSummarySenderOnly";
            return Localizer.getString(visibilityString);
        }

        return "";
    }

    /**
     * Helper method to provide strings for settings view
     */
    getStringsForSettings(): ISettingsComponentStrings {
        let settingsComponentStrings: ISettingsComponentStrings = {
            resultsVisibleTo: Localizer.getString("resultsVisibleTo"),
            resultsVisibleToAll: Localizer.getString("resultsVisibleToAll"),
            resultsVisibleToSender: Localizer.getString("resultsVisibleToSender"),
        };
        return settingsComponentStrings;
    }

    /**
     * Helper method to provide common settings props for both mobile and web view
     */
    getCommonSettingsProps() {
        return {
            resultVisibility: getStore().settings.resultVisibility,
            locale: getStore().context.locale,
            renderForMobile: UxUtils.renderingForMobile(),
            strings: this.getStringsForSettings(),
            onChange: (props: ISettingsComponentProps) => {
                updateSettings(props);
            },
            onMount: () => {
                UxUtils.setFocus(document.body, Constants.FOCUSABLE_ITEMS.All);
            },
        };
    }
}
