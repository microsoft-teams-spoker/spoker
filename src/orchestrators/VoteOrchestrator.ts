import {orchestrator} from "satcheljs";
import {initialize, setAction, setContext, setIsActionDeleted} from "../actions/VoteActions";
import {ActionSdkHelper} from "../helper/ActionSdkHelper";
import {Localizer} from "../utils/Localizer";
import {ProgressState} from "../utils/SharedEnum";
import {setProgressState, vote} from "./../actions/VoteActions";
import * as actionSDK from "@microsoft/m365-action-sdk";
import getStore from "../store/VoteStore";
import {Utils} from "../utils/Utils";

orchestrator(initialize, async () => {
    let actionContext = await ActionSdkHelper.getActionContext();
    if (actionContext.success) {
        setContext(actionContext.context);

        let action = await ActionSdkHelper.getAction(actionContext.context.actionId);
        if (action.success) {
            setAction(action.action);
            let response = await Localizer.initialize();
            setProgressState(response ? ProgressState.Completed : ProgressState.Failed);
        }
    }
});

orchestrator(vote, async (actionMessage) => {

    let actionDataRow: actionSDK.ActionDataRow = {
        id: Utils.generateGUID(),
        actionId: getStore().context.actionId,
        dataTableName: "Default",
        creatorId: getStore().context.userId,
        createTime: Date.now(),
        updateTime: Date.now(),
        columnValues: {["0"]: actionMessage.voteCard.toString()}
    };

    let response = await ActionSdkHelper.addOrUpdateActionDataRow(actionDataRow, actionMessage.isUpdate);

    if (!response.success) {
        handleError(response.error, "addOrUpdateActionDataRow");
    }
});

const handleError = (error: actionSDK.ApiError, requestType: string) => {
    handleErrorResponse(error);
    setProgressState(ProgressState.Failed);
};

const handleErrorResponse = (error: actionSDK.ApiError) => {
    if (error && error.code == "404") {
        setIsActionDeleted(true);
    }
};