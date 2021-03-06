// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {mutator} from "satcheljs";
import {Utils} from "../utils/Utils";
import {
    addActionInstanceRows,
    goBack,
    pollCloseAlertOpen,
    pollDeleteAlertOpen,
    pollExpiryChangeAlertOpen,
    setContext,
    setCurrentView,
    setIsActionDeleted,
    setProgressStatus,
    showMoreOptions,
    updateActionInstance,
    updateActionInstanceSummary,
    updateAllUsersInfo,
    updateContinuationToken,
    updateMemberCount,
    updateMyRow,
    updateNonResponders,
    updateUserProfileInfo
} from "./../actions/SummaryActions";
import getStore, {ViewType} from "./../store/SummaryStore";

/**
 * Summary view mutators to modify store data on which summmary view relies
 */

mutator(setProgressStatus, (msg) => {
    const store = getStore();
    store.progressStatus = {
        ...getStore().progressStatus,
        ...msg.status,
    };
});

mutator(setContext, (msg) => {
    const store = getStore();
    store.context = msg.context;
});

mutator(updateMyRow, (msg) => {
    const store = getStore();
    store.myRow = msg.row;
});

mutator(pollCloseAlertOpen, (msg) => {
    const store = getStore();
    store.isPollCloseAlertOpen = msg.open;
});

mutator(pollExpiryChangeAlertOpen, (msg) => {
    const store = getStore();
    store.isChangeExpiryAlertOpen = msg.open;
});

mutator(pollDeleteAlertOpen, (msg) => {
    const store = getStore();
    store.isDeletePollAlertOpen = msg.open;
});

mutator(showMoreOptions, (msg) => {
    const store = getStore();
    store.showMoreOptionsList = msg.showMoreOptions;
});

mutator(setCurrentView, (msg) => {
    const store = getStore();
    store.currentView = msg.viewType;
});

mutator(addActionInstanceRows, (msg) => {
    const store = getStore();
    store.actionInstanceRows = store.actionInstanceRows.concat(msg.rows);
});

mutator(updateContinuationToken, (msg) => {
    const store = getStore();
    store.continuationToken = msg.token;
});

mutator(updateUserProfileInfo, (msg) => {
    const store = getStore();
    store.userProfile = Object.assign(store.userProfile, msg.userProfileMap);
});

mutator(updateAllUsersInfo, (msg) => {
    const store = getStore();
    store.allUsersPolls = Object.assign(store.allUsersPolls, msg.usersProfileMap);
});

mutator(updateMemberCount, (msg) => {
    const store = getStore();
    store.memberCount = msg.memberCount;
});

mutator(goBack, () => {
    const store = getStore();
    let currentView: ViewType = store.currentView;

    switch (currentView) {
        case ViewType.ResponderView:
            store.currentView = ViewType.Main;
            break;

        case ViewType.NonResponderView:
            store.currentView = ViewType.Main;
            break;

        default:
            break;
    }
});

mutator(updateNonResponders, (msg) => {
    const store = getStore();
    const nonResponderList = msg.nonResponders;
    if (!Utils.isEmpty(nonResponderList) && nonResponderList.length > 0) {
        nonResponderList.sort((object1, object2) => {
            if (object1.displayName < object2.displayName) {
                return -1;
            }
            if (object1.displayName > object2.displayName) {
                return 1;
            }
            return 0;
        });
    }
    store.nonResponders = msg.nonResponders;
});

mutator(setIsActionDeleted, (msg) => {
    const store = getStore();
    store.isActionDeleted = msg.isActionDeleted;
});

mutator(updateActionInstance, (msg) => {
    const store = getStore();
    if (msg.actionInstance) {
        store.actionInstance = msg.actionInstance;
    }
});

mutator(updateActionInstanceSummary, (msg) => {
    const store = getStore();
    if (msg.actionInstanceSummary) {
        store.actionSummary = msg.actionInstanceSummary;
    }
});
