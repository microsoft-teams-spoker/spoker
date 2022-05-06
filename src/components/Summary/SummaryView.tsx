// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {Divider, Flex, Text} from "@fluentui/react-northstar";
import * as actionSDK from "@microsoft/m365-action-sdk";
import {observer} from "mobx-react";
import * as React from "react";
import {Localizer} from "../../utils/Localizer";
import {BarChartComponent, IBarChartItem} from "../BarChartComponent";
import {ErrorView} from "../ErrorView";
import {ShimmerContainer} from "../ShimmerLoader";
import {ITableItem, TableComponent} from "../TableComponent";
import {setCurrentView} from "./../../actions/SummaryActions";
import getSummaryStore, {ViewType} from "./../../store/SummaryStore";
import {ProgressState} from "./../../utils/SharedEnum";
import {UxUtils} from "./../../utils/UxUtils";
import "./summary.scss";

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
                    {this.getTopContainer()}
                    {this.getShortSummaryContainer()}
                </Flex>
            </>
        );
    }

    /**
     * Method to return configured scale
     */
    private getConfiguredScale(actionInstance: actionSDK.Action): string {
        let scale = "";
        if (actionInstance && actionInstance.customProperties) {
            const cps = actionInstance.customProperties;
            const scaleProp = cps.find(cp => cp.name === "Scale");
            if (!scaleProp) {
                return "fibo";
            } else {
                return scaleProp.value;
            }
        }
        return scale;
    }

    /**
     * Method to return short summary for each choice of poll
     */
    private getShortSummaryContainer(): JSX.Element {
        let showShimmer: boolean = false;
        let optionsWithResponseCount: ITableItem[] = [];
        let rowCount: number = 0;
        let progressStatus = getSummaryStore().progressStatus;
        let actionInstance = getSummaryStore().actionInstance;
        const scale = this.getConfiguredScale(actionInstance);

        if (progressStatus.actionInstanceSummary != ProgressState.Completed || progressStatus.actionInstance != ProgressState.Completed) {
            showShimmer = true;

            optionsWithResponseCount = [];
        } else {
            optionsWithResponseCount = this.getOptionsWithResponseCount();
            rowCount = getSummaryStore().actionSummary.rowCount;
        }

        let barChartComponent: JSX.Element = (
            <TableComponent
                scale={scale}
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
                                        <Text content={participation}/>
                                    )}
                                </div>
                            </ShimmerContainer>
                        </Flex.Item>
                    </Flex>
                </div>
                <Divider className="divider"/>
            </>
        );
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

    private getNonCreatorErrorView = () => {
        return (
            <Flex column className="non-creator-error-image-container">
                <img src="./images/permission_error.png" className="non-creator-error-image"/>
                <Text className="non-creator-error-text">
                    {this.isPollActive()
                        ? Localizer.getString("VisibilityCreatorOnlyLabel")
                        : !(getSummaryStore().myRow && getSummaryStore().myRow.columnValues)
                            ? Localizer.getString("NotRespondedLabel")
                            : Localizer.getString("VisibilityCreatorOnlyLabel")}
                </Text>
            </Flex>
        );
    };
}
