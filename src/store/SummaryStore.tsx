// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as actionSDK from "@microsoft/m365-action-sdk";
import {createStore} from "satcheljs";
import "./../mutator/SummaryMutator";
import "./../orchestrators/SummaryOrchectrator";
import {ProgressState} from "./../utils/SharedEnum";

/**
 * Summary view store containing all the required data
 */

/**
 * Enum to define three component of summary view (main page, responder and non-responder tab)
 */
export enum ViewType {
    Main,
    ResponderView,
    NonResponderView
}

export interface SummaryProgressStatus {
    actionInstance: ProgressState;
    actionInstanceSummary: ProgressState;
    memberCount: ProgressState;
    nonResponder: ProgressState;
    localizationState: ProgressState;
    actionInstanceRow: ProgressState;
    myActionInstanceRow: ProgressState;
    closeActionInstance: ProgressState;
    deleteActionInstance: ProgressState;
    updateActionInstance: ProgressState;
    currentContext: ProgressState;
}

interface IPollSummaryStore {
    context: actionSDK.ActionSdkContext;
    actionInstance: actionSDK.Action;
    actionSummary: actionSDK.ActionDataRowsSummary;
    currentView: ViewType;
    continuationToken: string;
    actionInstanceRows: actionSDK.ActionDataRow[];
    myRow: actionSDK.ActionDataRow;
    userProfile: { [key: string]: actionSDK.SubscriptionMember };
    allUsersPolls: { user: actionSDK.SubscriptionMember, responseIds: { [key: string]: string } }[];
    nonResponders: actionSDK.SubscriptionMember[];
    memberCount: number;
    showMoreOptionsList: boolean;
    isPollCloseAlertOpen: boolean;
    isChangeExpiryAlertOpen: boolean;
    isDeletePollAlertOpen: boolean;
    progressStatus: SummaryProgressStatus;
    isActionDeleted: boolean;
}

const store: IPollSummaryStore = {
    context: null,
    actionInstance: null,
    actionSummary: null,
    myRow: null,
    currentView: ViewType.Main,
    actionInstanceRows: [],
    continuationToken: null,
    showMoreOptionsList: false,
    isPollCloseAlertOpen: false,
    isChangeExpiryAlertOpen: false,
    isDeletePollAlertOpen: false,
    userProfile: {},
    allUsersPolls: [],
    nonResponders: null,
    memberCount: null,
    progressStatus: {
        actionInstance: ProgressState.NotStarted,
        actionInstanceSummary: ProgressState.NotStarted,
        memberCount: ProgressState.NotStarted,
        nonResponder: ProgressState.NotStarted,
        localizationState: ProgressState.NotStarted,
        actionInstanceRow: ProgressState.NotStarted,
        myActionInstanceRow: ProgressState.NotStarted,
        closeActionInstance: ProgressState.NotStarted,
        deleteActionInstance: ProgressState.NotStarted,
        updateActionInstance: ProgressState.NotStarted,
        currentContext: ProgressState.NotStarted,
    },
    isActionDeleted: false
};

export default createStore<IPollSummaryStore>("summaryStore", store);
