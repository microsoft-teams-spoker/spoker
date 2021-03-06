// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as actionSDK from "@microsoft/m365-action-sdk";
import {action} from "satcheljs";
import {SummaryProgressStatus, ViewType} from "../store/SummaryStore";

export enum PollSummaryAction {
    initialize = "initialize",
    setContext = "setContext",
    setCurrentView = "setCurrentView",
    showMoreOptions = "showMoreOptions",
    actionInstanceRow = "actionInstanceRow",
    pollCloseAlertOpen = "pollCloseAlertOpen",
    pollExpiryChangeAlertOpen = "pollExpiryChangeAlertOpen",
    pollDeleteAlertOpen = "pollDeleteAlertOpen",
    updateNonResponders = "updateNonResponders",
    updateMemberCount = "updateMemberCount",
    updateUserProfileInfo = "updateUserProfileInfo",
    updateAllUsersInfo = "updateAllUsersInfo",
    updateMyRow = "updateMyRow",
    setProgressStatus = "setProgressStatus",
    goBack = "goBack",
    fetchUserDetails = "fetchUserDetails",
    fetchActionInstanceRows = "fetchActionInstanceRows",
    fetchActionInstance = "fetchActionInstance",
    fetchActionInstanceSummary = "fetchActionInstanceSummary",
    fetchAllUsersPolls = "fetchAllUsersPolls",
    fetchNonReponders = "fetchNonReponders",
    closePoll = "closePoll",
    deletePoll = "deletePoll",
    updateContinuationToken = "updateContinuationToken",
    fetchLocalization = "fetchLocalization",
    fetchMyResponse = "fetchMyResponse",
    fetchMemberCount = "fetchMemberCount",
    setIsActionDeleted = "setIsActionDeleted",
    updateActionInstance = "updateActionInstance",
    updateActionInstanceSummary = "updateActionInstanceSummary",
}

export let initialize = action(PollSummaryAction.initialize);

export let fetchUserDetails = action(PollSummaryAction.fetchUserDetails, (userIds: string[]) => ({
    userIds: userIds
}));

export let fetchLocalization = action(PollSummaryAction.fetchLocalization);

export let fetchMyResponse = action(PollSummaryAction.fetchMyResponse);

export let fetchMemberCount = action(PollSummaryAction.fetchMemberCount);

export let fetchActionInstanceRows = action(PollSummaryAction.fetchActionInstanceRows, (shouldFetchUserDetails: boolean) => ({
    shouldFetchUserDetails: shouldFetchUserDetails
}));

export let fetchNonReponders = action(PollSummaryAction.fetchNonReponders);

export let fetchActionInstance = action(PollSummaryAction.fetchActionInstance, (updateProgressState: boolean) => ({
    updateProgressState: updateProgressState
}));
export let fetchActionInstanceSummary = action(PollSummaryAction.fetchActionInstanceSummary, (updateProgressState: boolean) => ({
    updateProgressState: updateProgressState
}));

export let fetchAllUsersPolls = action(PollSummaryAction.fetchAllUsersPolls);

export let closePoll = action(PollSummaryAction.closePoll);

export let deletePoll = action(PollSummaryAction.deletePoll);

export let setProgressStatus = action(PollSummaryAction.setProgressStatus, (status: Partial<SummaryProgressStatus>) => ({
    status: status
}));

export let setContext = action(PollSummaryAction.setContext, (context: actionSDK.ActionSdkContext) => ({
    context: context
}));

export let updateMyRow = action(PollSummaryAction.updateMyRow, (row: actionSDK.ActionDataRow) => ({
    row: row
}));

export let pollCloseAlertOpen = action(PollSummaryAction.pollCloseAlertOpen, (open: boolean) => ({
    open: open
}));

export let pollExpiryChangeAlertOpen = action(PollSummaryAction.pollExpiryChangeAlertOpen, (open: boolean) => ({
    open: open
}));

export let pollDeleteAlertOpen = action(PollSummaryAction.pollDeleteAlertOpen, (open: boolean) => ({
    open: open
}));

export let showMoreOptions = action(PollSummaryAction.showMoreOptions, (showMoreOptions: boolean) => ({
    showMoreOptions: showMoreOptions
}));

export let setCurrentView = action(PollSummaryAction.setCurrentView, (viewType: ViewType) => ({
    viewType: viewType
}));

export let addActionInstanceRows = action(PollSummaryAction.actionInstanceRow, (rows: actionSDK.ActionDataRow[]) => ({
    rows: rows
}));

export let updateContinuationToken = action(PollSummaryAction.updateContinuationToken, (token: string) => ({
    token: token
}));

export let updateUserProfileInfo = action(PollSummaryAction.updateUserProfileInfo, (userProfileMap: { [key: string]: actionSDK.SubscriptionMember }) => ({
    userProfileMap: userProfileMap
}));

export let updateAllUsersInfo = action(PollSummaryAction.updateAllUsersInfo, (usersProfileMap: { user: actionSDK.SubscriptionMember, responseIds: { [key: string]: string } }[]) => ({
    usersProfileMap: usersProfileMap
}));

export let updateMemberCount = action(PollSummaryAction.updateMemberCount, (memberCount) => ({
    memberCount: memberCount
}));

export let goBack = action(PollSummaryAction.goBack);

export let updateNonResponders = action(PollSummaryAction.updateNonResponders, (nonResponders: actionSDK.SubscriptionMember[]) => ({
    nonResponders: nonResponders
}));

export let setIsActionDeleted = action(PollSummaryAction.setIsActionDeleted, (isActionDeleted: boolean) => ({
    isActionDeleted: isActionDeleted
}));

export let updateActionInstance = action(PollSummaryAction.updateActionInstance, (actionInstance: actionSDK.Action) => ({
    actionInstance: actionInstance
}));

export let updateActionInstanceSummary = action(PollSummaryAction.updateActionInstanceSummary, (actionInstanceSummary: actionSDK.ActionDataRowsSummary) => ({
    actionInstanceSummary: actionInstanceSummary
}));
