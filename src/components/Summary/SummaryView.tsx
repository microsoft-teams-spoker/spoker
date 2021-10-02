// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import { observer } from "mobx-react";
import getSummaryStore, { ViewType } from "./../../store/SummaryStore";
import "./summary.scss";
import {
    closePoll, pollCloseAlertOpen, updateDueDate, pollExpiryChangeAlertOpen, setDueDate, pollDeleteAlertOpen, deletePoll,
    setCurrentView, downloadCSV, setProgressStatus
} from "./../../actions/SummaryActions";
import {
    Flex, Dialog, Loader, Text, Avatar, ButtonProps, BanIcon, TrashCanIcon, CalendarIcon, MoreIcon, SplitButton, Divider
} from "@fluentui/react-northstar";
import * as html2canvas from "html2canvas";
import { Utils } from "../../utils/Utils";
import { Localizer } from "../../utils/Localizer";
import * as actionSDK from "@microsoft/m365-action-sdk";
import { ProgressState } from "./../../utils/SharedEnum";
import { ShimmerContainer } from "../ShimmerLoader";
import { IBarChartItem, BarChartComponent } from "../BarChartComponent";
import { ErrorView } from "../ErrorView";
import { UxUtils } from "./../../utils/UxUtils";
import { AdaptiveMenuItem, AdaptiveMenuRenderStyle, AdaptiveMenu } from "../Menu";
import { Constants } from "./../../utils/Constants";
import { DateTimePickerView } from "../DateTime";
import { ITableItem, TableComponent } from "../TableComponent";
import getCreationStore from "../../store/CreationStore";

/**
 * <SummaryView> component that will render the main page with participation details
 */
@observer
export default class SummaryView extends React.Component<any, any> {
    private bodyContainer: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.bodyContainer = React.createRef();
    }

    render() { 
        return (
            <>
                <Flex
                    column
                    className="body-container no-mobile-footer no-top-padding"
                    ref={this.bodyContainer}
                    id="bodyContainer"
                >
                    {this.getHeaderContainer()}
                    {this.getTopContainer()}
                    {this.getShortSummaryContainer()}
                </Flex>
                {this.getFooterView()}
            </>
        );
    }

    /**
     * Method that will return the UI component of response of current user
     */
    private getMyResponseContainer(): JSX.Element {
        let myResponse: string = "";
        console.log(getSummaryStore().allUsersPolls);

        // User name
        let currentUserProfile: actionSDK.SubscriptionMember = getSummaryStore().context
            ? getSummaryStore().userProfile[getSummaryStore().context.userId] : null;

        let myUserName = (currentUserProfile && currentUserProfile.displayName)
            ? currentUserProfile.displayName : Localizer.getString("You");

        // Showing shimmer effect till we get data from API
        let progressStatus = getSummaryStore().progressStatus;
        if (progressStatus.myActionInstanceRow != ProgressState.Completed ||
            progressStatus.actionInstance != ProgressState.Completed) {
            return (
                <Flex className="my-response" gap="gap.small" vAlign="center">
                    <ShimmerContainer showProfilePic>
                        <Avatar
                            aria-hidden={true}
                            name={myUserName}
                            className="no-flex-shrink"
                        />
                    </ShimmerContainer>
                    <ShimmerContainer fill>
                        <label>{Localizer.getString("NotResponded")}</label>
                    </ShimmerContainer>
                </Flex>
            );
        } else if (getSummaryStore().myRow && getSummaryStore().myRow.columnValues) {
            // getting poll choice selected by current user from actionInstance
            myResponse = getSummaryStore().actionInstance.dataTables[0].dataColumns[0].options[getSummaryStore().myRow.columnValues[0]].displayName;

            return (
                <>
                    {getSummaryStore().myRow && (
                        <Flex
                            data-html2canvas-ignore="true"
                            className="my-response"
                            gap="gap.small"
                            vAlign="center"
                        >
                            <Avatar
                                aria-hidden={true}
                                name={myUserName}
                                className="no-flex-shrink"
                            />
                            <Flex column className="overflow-hidden">
                                <Text
                                    truncated
                                    title = {myResponse}
                                    content={Localizer.getString("YourResponse", myResponse)}
                                />
                            </Flex>
                        </Flex>
                    )}
                </>
            );
        } else {
            return (
                <Flex
                    data-html2canvas-ignore="true"
                    className="my-response"
                    gap="gap.small"
                    vAlign="center"
                >
                    <Avatar
                        aria-hidden={true}
                        name={myUserName}
                        className="no-flex-shrink"
                    />
                    <label>{Localizer.getString("NotResponded")}</label>
                </Flex>
            );
        }
    }

    /**
     * Method to return short summary for each choice of poll
     */
    private getShortSummaryContainer(): JSX.Element {
        let showShimmer: boolean = false;
        let optionsWithResponseCount: ITableItem[] = [];
        let rowCount: number = 0;
        let progressStatus = getSummaryStore().progressStatus;
        if (progressStatus.actionInstanceSummary != ProgressState.Completed || progressStatus.actionInstance != ProgressState.Completed) {
            showShimmer = true;

            optionsWithResponseCount = [];
        } else {
            optionsWithResponseCount = this.getOptionsWithResponseCount();
            rowCount = getSummaryStore().actionSummary.rowCount;
        }

        let barChartComponent: JSX.Element = (
            <TableComponent
                scale={getCreationStore().scale}
                allUsersPolls={optionsWithResponseCount}
            />
        );

        if (showShimmer) {
            return (
                <>
                    {barChartComponent}
                </>
            );
        } else {
            return (
                <>
                    <Text weight="bold" className="primary-text word-break">
                        {getSummaryStore().actionInstance && getSummaryStore().actionInstance.dataTables[0].dataColumns[0].displayName}
                    </Text>
                    {this.canCurrentUserViewResults() ? barChartComponent : this.getNonCreatorErrorView()}
                </>
            );
        }
    }

    private getOptionsWithResponseCount(): ITableItem[] {
        let progressStatus = getSummaryStore().progressStatus;
        if (progressStatus.actionInstance == ProgressState.Completed &&
            progressStatus.actionInstanceSummary == ProgressState.Completed) {
            let optionsWithResponseCount: ITableItem[] = [];

            for (let option of getSummaryStore().allUsersPolls) {
                optionsWithResponseCount.push({
                    user: option.user,
                    responseIds: option.responseIds
                });
            }
            return optionsWithResponseCount;
        }
    }

    /**
     * Return Ui component with total participation of poll
     */
    private getTopContainer(): JSX.Element {
        let progressStatus = getSummaryStore().progressStatus;
        if (progressStatus.memberCount == ProgressState.Failed || progressStatus.actionInstance == ProgressState.Failed ||
            progressStatus.actionInstanceSummary == ProgressState.Failed) {
            return (
                <ErrorView
                    title={Localizer.getString("GenericError")}
                    buttonTitle={Localizer.getString("Close")}
                />
            );
        }

        let rowCount: number = getSummaryStore().actionSummary ? getSummaryStore().actionSummary.rowCount : 0;
        let memberCount: number = getSummaryStore().memberCount ? getSummaryStore().memberCount : 0;
        let participationInfoItems: IBarChartItem[] = [];
        let participationPercentage = memberCount ? Math.round((rowCount / memberCount) * 100) : 0;

        participationInfoItems.push({
            id: "participation",
            title: Localizer.getString("Participation", participationPercentage),
            titleClassName: "participation-title",
            quantity: rowCount,
            hideStatistics: true,
        });
        let participation: string = (rowCount == 1)
            ? Localizer.getString("ParticipationIndicatorSingular", rowCount, memberCount)
            : Localizer.getString("ParticipationIndicatorPlural", rowCount, memberCount);

        let showShimmer: boolean = false;

        if (progressStatus.memberCount != ProgressState.Completed || progressStatus.actionInstance != ProgressState.Completed ||
            progressStatus.actionInstanceSummary != ProgressState.Completed) {
            showShimmer = true;
        }
        return (
            <>
                <div
                    role="group"
                    aria-label={Localizer.getString("Participation", participationPercentage)}
                >
                    <BarChartComponent
                        items={participationInfoItems}
                        getBarPercentageString={(percentage: number) => {
                            return Localizer.getString("BarPercentage", percentage);
                        }}
                        totalQuantity={memberCount}
                        showShimmer={showShimmer}
                    />

                    <Flex space="between" className="participation-container">
                        <Flex.Item aria-hidden="false">
                            <ShimmerContainer lines={1} showShimmer={showShimmer}>
                                <div>
                                    {this.canCurrentUserViewResults() ? (
                                        <Text
                                            {...UxUtils.getTabKeyProps()}
                                            tabIndex={0}
                                            role="button"
                                            className="underline"
                                            color="brand"
                                            size="small"
                                            content={participation}
                                            onClick={() => {
                                                setCurrentView(ViewType.ResponderView);
                                            }}
                                        />
                                    ) : (
                                            <Text content={participation} />
                                        )}
                                </div>
                            </ShimmerContainer>
                        </Flex.Item>
                    </Flex>
                </div>
                <Divider className="divider" />
            </>
        );
    }

    /**
     * Return UI for due date and dropdown
     */
    private getHeaderContainer(): JSX.Element {
        let actionInstanceStatusString = this.getActionInstanceStatusString();
        return (
            <Flex
                role="group"
                aria-label={actionInstanceStatusString}
                vAlign="center"
                className={"header-container"}
            >
                <ShimmerContainer
                    lines={1}
                    showShimmer={
                        getSummaryStore().progressStatus.actionInstance != ProgressState.Completed
                    }
                >
                    <Text size="small">{actionInstanceStatusString}</Text>
                    {this.getMenu()}
                </ShimmerContainer>
                {getSummaryStore().progressStatus.actionInstance == ProgressState.Completed ? (
                    <>
                        {this.setupDeleteDialog()}
                        {this.setupCloseDialog()}
                        {this.setupDuedateDialog()}
                    </>
                ) : null}
            </Flex>
        );
    }

    private getActionInstanceStatusString(): string {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };

        let contextLocale = (getSummaryStore().context && getSummaryStore().context.locale) || Utils.DEFAULT_LOCALE;
        let actionInstance = getSummaryStore().actionInstance;

        if (!actionInstance) {
            return Localizer.getString("dueByDate", UxUtils.formatDate(new Date(), contextLocale, options));
        }

        if (this.isPollActive()) {
            return Localizer.getString("dueByDate", UxUtils.formatDate(new Date(actionInstance.expiryTime), contextLocale, options));
        }

        if (actionInstance.status == actionSDK.ActionStatus.Closed) {
            let expiry: number = actionInstance.updateTime ? actionInstance.updateTime : actionInstance.expiryTime;
            return Localizer.getString("ClosedOn", UxUtils.formatDate(new Date(expiry), contextLocale, options));
        }

        if (actionInstance.status == actionSDK.ActionStatus.Expired) {
            return Localizer.getString("ExpiredOn", UxUtils.formatDate(new Date(actionInstance.expiryTime), contextLocale, options));
        }
    }

    /**
     * Method for UI component of download button
     */
    private getFooterView(): JSX.Element {
        let progressStatus = getSummaryStore().progressStatus;
        if ((progressStatus.actionInstance != ProgressState.Completed) || (UxUtils.renderingForMobile())
            || (this.canCurrentUserViewResults() === false)) {
            return null;
        }

        let content = (progressStatus.downloadData == ProgressState.InProgress)
            ? (<Loader size="small" />) : (Localizer.getString("Download"));

        let menuItems = [];
        menuItems.push(this.getDownloadSplitButtonItem("download_image", "DownloadImage"));
        menuItems.push(this.getDownloadSplitButtonItem("download_responses", "DownloadResponses"));

        return menuItems.length > 0 ? (
            <Flex className="footer-layout" gap={"gap.smaller"} hAlign="end">
                <SplitButton
                    key="download_button"
                    id="download"
                    menu={menuItems}
                    button={{
                        content: { content },
                        className: "download-button",
                    }}
                    primary
                    toggleButton={{ "aria-label": "more-options" }}
                    onMainButtonClick={() => this.downloadImage()}
                />
            </Flex>
        ) : null;
    }

    private getDownloadSplitButtonItem(key: string, menuLabel: string) {
        let menuItem: AdaptiveMenuItem = {
            key: key,
            content: <Text content={Localizer.getString(menuLabel)} />,
            onClick: () => {
                if (key == "download_image") {
                    this.downloadImage();
                } else if (key == "download_responses") {
                    downloadCSV();
                }
            },
        };
        return menuItem;
    }

    private downloadImage() {
        let bodyContainerDiv = document.getElementById("bodyContainer") as HTMLDivElement;
        let backgroundColorOfResultsImage: string = UxUtils.getBackgroundColorForTheme(getSummaryStore().context.theme);
        (html2canvas as any)(bodyContainerDiv, {
            width: bodyContainerDiv.scrollWidth,
            height: bodyContainerDiv.scrollHeight,
            backgroundColor: backgroundColorOfResultsImage,
        }).then((canvas) => {
            let fileName: string =
                Localizer.getString("PollResult", getSummaryStore().actionInstance.dataTables[0].dataColumns[0].displayName)
                    .substring(0, Constants.ACTION_RESULT_FILE_NAME_MAX_LENGTH) + ".png";
            let base64Image = canvas.toDataURL("image/png");
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(canvas.msToBlob(), fileName);
            } else {
                Utils.downloadContent(fileName, base64Image);
            }
        });
    }

    private setupDuedateDialog() {
        return (
            <Dialog
                className="due-date-dialog"
                overlay={{
                    className: "dialog-overlay",
                }}
                open={getSummaryStore().isChangeExpiryAlertOpen}
                onOpen={(e, { open }) => pollExpiryChangeAlertOpen(open)}
                cancelButton={
                    this.getDialogButtonProps(Localizer.getString("ChangeDueDate"), Localizer.getString("Cancel"))
                }
                confirmButton={
                    getSummaryStore().progressStatus.updateActionInstance ==
                        ProgressState.InProgress ? (<Loader size="small" />) : (this.getDueDateDialogConfirmationButtonProps())
                }
                content={
                    <Flex gap="gap.smaller" column>
                        <DateTimePickerView
                            locale={getSummaryStore().context.locale}
                            renderForMobile={UxUtils.renderingForMobile()}
                            minDate={new Date()}
                            value={new Date(getSummaryStore().dueDate)}
                            placeholderDate={Localizer.getString("SelectADate")}
                            placeholderTime={Localizer.getString("SelectATime")}
                            onSelect={(date: Date) => {
                                setDueDate(date.getTime());
                            }}
                        />
                        {getSummaryStore().progressStatus.updateActionInstance ==
                            ProgressState.Failed ? (
                                <Text
                                    content={Localizer.getString("SomethingWentWrong")}
                                    className="error"
                                />
                            ) : null}
                    </Flex>
                }
                header={Localizer.getString("ChangeDueDate")}
                onCancel={() => {
                    pollExpiryChangeAlertOpen(false);
                }}
                onConfirm={() => {
                    updateDueDate(getSummaryStore().dueDate);
                }}
            />
        );
    }

    private getDialogButtonProps(dialogDescription: string, buttonLabel: string): ButtonProps {
        let buttonProps: ButtonProps = {
            content: buttonLabel,
        };

        if (UxUtils.renderingForMobile()) {
            Object.assign(buttonProps, { "aria-label": Localizer.getString("DialogTalkback", dialogDescription, buttonLabel) });
        }
        return buttonProps;
    }

    private getDueDateDialogConfirmationButtonProps(): ButtonProps {
        let confirmButtonProps: ButtonProps = {
            // if difference less than 60 secs, keep it disabled
            disabled:
                Math.abs(getSummaryStore().dueDate - getSummaryStore().actionInstance.expiryTime) /
                1000 <=
                60,
        };
        Object.assign(confirmButtonProps, this.getDialogButtonProps(
            Localizer.getString("ChangeDueDate"), Localizer.getString("Change")));
        return confirmButtonProps;
    }

    private getMenu() {
        let menuItems: AdaptiveMenuItem[] = this.getMenuItems();
        if (menuItems.length == 0) {
            return null;
        }
        return (
            <AdaptiveMenu
                className="triple-dot-menu"
                key="poll_options"
                renderAs={
                    UxUtils.renderingForMobile() ? AdaptiveMenuRenderStyle.ACTIONSHEET : AdaptiveMenuRenderStyle.MENU
                }
                content={
                    <MoreIcon title={Localizer.getString("MoreOptions")} outline aria-hidden={false} role="button" />
                }
                menuItems={menuItems}
                dismissMenuAriaLabel={Localizer.getString("DismissMenu")}
            />
        );
    }

    private getMenuItems(): AdaptiveMenuItem[] {
        let menuItemList: AdaptiveMenuItem[] = [];
        if (this.isCurrentUserCreator() && this.isPollActive()) {
            let changeExpiry: AdaptiveMenuItem = {
                key: "changeDueDate",
                content: Localizer.getString("ChangeDueBy"),
                icon: <CalendarIcon outline={true} />,
                onClick: () => {
                    if (getSummaryStore().progressStatus.updateActionInstance != ProgressState.InProgress) {
                        setProgressStatus({ updateActionInstance: ProgressState.NotStarted });
                    }
                    pollExpiryChangeAlertOpen(true);
                }
            };
            menuItemList.push(changeExpiry);

            let closePoll: AdaptiveMenuItem = {
                key: "close",
                content: Localizer.getString("ClosePoll"),
                icon: <BanIcon outline={true} />,
                onClick: () => {
                    if (getSummaryStore().progressStatus.deleteActionInstance != ProgressState.InProgress) {
                        setProgressStatus({ closeActionInstance: ProgressState.NotStarted });
                    }
                    pollCloseAlertOpen(true);
                }
            };
            menuItemList.push(closePoll);
        }
        if (this.isCurrentUserCreator()) {
            let deletePoll: AdaptiveMenuItem = {
                key: "delete",
                content: Localizer.getString("DeletePoll"),
                icon: <TrashCanIcon outline={true} />,
                onClick: () => {
                    if (getSummaryStore().progressStatus.deleteActionInstance != ProgressState.InProgress) {
                        setProgressStatus({ deleteActionInstance: ProgressState.NotStarted });
                    }
                    pollDeleteAlertOpen(true);
                }
            };
            menuItemList.push(deletePoll);
        }
        return menuItemList;
    }

    private isCurrentUserCreator(): boolean {
        return (
            getSummaryStore().actionInstance && getSummaryStore().context && (getSummaryStore().context.userId == getSummaryStore().actionInstance.creatorId)
        );
    }

    private isPollActive(): boolean {
        return (
            getSummaryStore().actionInstance && (getSummaryStore().actionInstance.status == actionSDK.ActionStatus.Active)
        );
    }

    private canCurrentUserViewResults(): boolean {
        return (
            getSummaryStore().actionInstance &&
            (this.isCurrentUserCreator() || getSummaryStore().actionInstance.dataTables[0].rowsVisibility == actionSDK.Visibility.All)
        );
    }

    private setupCloseDialog() {
        return (
            <Dialog
                className="dialog-base"
                overlay={{
                    className: "dialog-overlay",
                }}
                open={getSummaryStore().isPollCloseAlertOpen}
                onOpen={(e, { open }) => pollCloseAlertOpen(open)}
                cancelButton={
                    this.getDialogButtonProps(Localizer.getString("ClosePoll"), Localizer.getString("Cancel"))
                }
                confirmButton={
                    getSummaryStore().progressStatus.closeActionInstance ==
                        ProgressState.InProgress
                        ? (<Loader size="small" />)
                        : (this.getDialogButtonProps(Localizer.getString("ClosePoll"), Localizer.getString("Confirm")))
                }
                content={
                    <Flex gap="gap.smaller" column>
                        <Text content={Localizer.getString("ClosePollConfirmation")} />
                        {getSummaryStore().progressStatus.closeActionInstance ==
                            ProgressState.Failed ? (
                                <Text
                                    content={Localizer.getString("SomethingWentWrong")}
                                    className="error"
                                />
                            ) : null}
                    </Flex>
                }
                header={Localizer.getString("ClosePoll")}
                onCancel={() => {
                    pollCloseAlertOpen(false);
                }}
                onConfirm={() => {
                    closePoll();
                }}
            />
        );
    }

    private setupDeleteDialog() {
        return (
            <Dialog
                className="dialog-base"
                overlay={{
                    className: "dialog-overlay",
                }}
                open={getSummaryStore().isDeletePollAlertOpen}
                onOpen={(e, { open }) => pollDeleteAlertOpen(open)}
                cancelButton={
                    this.getDialogButtonProps(Localizer.getString("DeletePoll"), Localizer.getString("Cancel"))
                }
                confirmButton={
                    getSummaryStore().progressStatus.deleteActionInstance ==
                        ProgressState.InProgress
                        ? (<Loader size="small" />)
                        : (this.getDialogButtonProps(Localizer.getString("DeletePoll"), Localizer.getString("Confirm")))
                }
                content={
                    <Flex gap="gap.smaller" column>
                        <Text content={Localizer.getString("DeletePollConfirmation")} />
                        {getSummaryStore().progressStatus.closeActionInstance ==
                            ProgressState.Failed ? (
                                <Text
                                    content={Localizer.getString("SomethingWentWrong")}
                                    className="error"
                                />
                            ) : null}
                    </Flex>
                }
                header={Localizer.getString("DeletePoll")}
                onCancel={() => {
                    pollDeleteAlertOpen(false);
                }}
                onConfirm={() => {
                    deletePoll();
                }}
            />
        );
    }

    private getNonCreatorErrorView = () => {
        return (
            <Flex column className="non-creator-error-image-container">
                <img src="./images/permission_error.png" className="non-creator-error-image" />
                <Text className="non-creator-error-text">
                    {this.isPollActive()
                        ? Localizer.getString("VisibilityCreatorOnlyLabel")
                        : !(getSummaryStore().myRow && getSummaryStore().myRow.columnValues)
                            ? Localizer.getString("NotRespondedLabel")
                            : Localizer.getString("VisibilityCreatorOnlyLabel")}
                </Text>
                {getSummaryStore().myRow && getSummaryStore().myRow.columnValues ? (
                    <a
                        className="download-your-responses-link"
                        onClick={() => {
                            downloadCSV();
                        }}
                    >
                        {Localizer.getString("DownloadYourResponses")}
                    </a>
                ) : null}
            </Flex>
        );
    }
}
