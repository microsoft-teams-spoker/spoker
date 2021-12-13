import {orchestrator} from "satcheljs";
import {fetchAction, fetchMyRow, initialize, setAction, setContext, setIsActionDeleted, setMyRow, setVoteCard, setVoteCardActionDataRow} from "../actions/VoteActions";
import {ActionSdkHelper} from "../helper/ActionSdkHelper";
import {ProgressState} from "../utils/SharedEnum";
import {setProgressStatus, vote} from "./../actions/VoteActions";
import * as actionSDK from "@microsoft/m365-action-sdk";
import getStore from "../store/VoteStore";
import {Utils} from "../utils/Utils";
import {VoteCardEnum} from "../components/VoteCard/VoteCard";

orchestrator(initialize, async () => {
    let context = getStore().progressStatus.context;
    if (context == ProgressState.NotStarted || context == ProgressState.Failed) {
        setProgressStatus({context: ProgressState.InProgress});

        let response = await ActionSdkHelper.getActionContext();
        if (response.success) {
            setContext(response.context);
            setProgressStatus({context: ProgressState.Completed});

            fetchAction();
            fetchMyRow();
        } else {
            setProgressStatus({context: ProgressState.Failed});
            handleError(response.error, "initialize");
        }
    }
});

orchestrator(fetchAction, async () => {
    let action = getStore().progressStatus.action;
    if (action == ProgressState.NotStarted || action == ProgressState.Failed) {
        setProgressStatus({action: ProgressState.InProgress});

        let response = await ActionSdkHelper.getAction(getStore().context.actionId);

        if (response.success) {
            setAction(response.action);
            setProgressStatus({action: ProgressState.Completed});
        } else {
            setProgressStatus({action: ProgressState.Failed});
            handleError(response.error, "fetchAction");
        }
    }
});

orchestrator(fetchMyRow, async () => {
    let myRow = getStore().progressStatus.myRow;
    if (myRow == ProgressState.NotStarted || myRow == ProgressState.Failed) {
        setProgressStatus({myRow: ProgressState.InProgress});

        let response = await ActionSdkHelper.getActionDataRows(getStore().context.actionId, "self", null, 1);

        if (response.success) {
            const actionDataRow = response.dataRows[0];
            if (actionDataRow) {
                setMyRow(actionDataRow);
                const voteCard: VoteCardEnum = parseInt(actionDataRow.columnValues['0']);
                setVoteCard(voteCard);
                setVoteCardActionDataRow(actionDataRow);
            }
            setProgressStatus({myRow: ProgressState.Completed});
        } else {
            setProgressStatus({myRow: ProgressState.Failed});
            handleError(response.error, "fetchMyRow");
        }
    }
});

orchestrator(vote, async (actionMessage) => {
    let actionDataRow: actionSDK.ActionDataRow = getStore().voteCardActionDataRow;
    let isUpdate = !!actionDataRow;

    if (isUpdate) {
        actionDataRow.columnValues["0"] = actionMessage.voteCard.toString();
    } else {
        actionDataRow = {
            id: Utils.generateGUID(),
            actionId: getStore().context.actionId,
            dataTableName: "Default",
            creatorId: getStore().context.userId,
            createTime: Date.now(),
            updateTime: Date.now(),
            columnValues: {["0"]: actionMessage.voteCard.toString()}
        };
    }
    setVoteCardActionDataRow(actionDataRow);
    let response = await ActionSdkHelper.addOrUpdateActionDataRow(actionDataRow, isUpdate);

    if (!response.success) {
        handleError(response.error, "addOrUpdateActionDataRow");
    }
});

const handleError = (error: actionSDK.ApiError, requestType: string) => {
    handleErrorResponse(error);
};

const handleErrorResponse = (error: actionSDK.ApiError) => {
    if (error && error.code == "404") {
        setIsActionDeleted(true);
    }
};