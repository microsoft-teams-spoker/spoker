import * as actionSDK from "@microsoft/m365-action-sdk";
import {action} from "satcheljs";
import {ProgressState} from "../utils/SharedEnum";

export enum PollVoteAction {
    initialize = "initialize",
    setContext = "setContext",
    setProgressState = "setProgressState",
    vote = "vote",
    setIsActionDeleted = "setIsActionDeleted",
}

export let initialize = action(PollVoteAction.initialize);

export let setContext = action(
    PollVoteAction.setContext,
    (context: actionSDK.ActionSdkContext) => ({
        context: context,
    })
);

export let setProgressState = action(
    PollVoteAction.setProgressState,
    (state: ProgressState) => ({
        state: state,
    })
);

export let vote = action(PollVoteAction.vote);

export let setIsActionDeleted = action(PollVoteAction.setIsActionDeleted, (isActionDeleted: boolean) => ({
    isActionDeleted: isActionDeleted
}));