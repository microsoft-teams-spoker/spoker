import {orchestrator} from "satcheljs";
import {initialize, setContext, setIsActionDeleted} from "../actions/VoteActions";
import {ActionSdkHelper} from "../helper/ActionSdkHelper";
import {Localizer} from "../utils/Localizer";
import {ProgressState} from "../utils/SharedEnum";
import {setProgressState, vote} from "./../actions/VoteActions";
import * as actionSDK from "@microsoft/m365-action-sdk";
import getStore from "../store/VoteStore";
import {Utils} from "../utils/Utils";

/**
 * Initialization of createion view fetching action context and localization details
 */
orchestrator(initialize, async () => {
    let actionContext = await ActionSdkHelper.getActionContext();
    if (actionContext.success) {
        setContext(actionContext.context);
        let response = await Localizer.initialize();
        setProgressState(response ? ProgressState.Completed : ProgressState.Failed);
    }
});

orchestrator(vote, async () => {

    let actionDataRow: actionSDK.ActionDataRow = {
        id: Utils.generateGUID(),
        actionId: getStore().context.actionId,
        dataTableName: "Default",
        creatorId: getStore().context.userId,
        createTime: Date.now(),
        updateTime: Date.now(),
        columnValues: {["0"]: "4"}
    };

    let response = await ActionSdkHelper.addActionDataRow(actionDataRow);

    if (response.success) {
    } else {
        handleError(response.error, "addActionDataRow");
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