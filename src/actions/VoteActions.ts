import * as actionSDK from "@microsoft/m365-action-sdk";
import {action} from "satcheljs";
import {VoteCardEnum} from "../components/VoteCard/VoteCard";
import {VoteProgressStatus} from "../store/VoteStore";

export enum PollVoteAction {
    initialize = "initialize",
    setContext = "setContext",
    setAction = "setAction",
    setProgressStatus = "setProgressStatus",
    setVoteCard = "setVoteCard",
    setMyRow = "setMyRow",
    vote = "vote",
    setIsActionDeleted = "setIsActionDeleted",
    fetchAction = "fetchAction",
    fetchMyRow = "fetchMyRow",
}

export let initialize = action(PollVoteAction.initialize);

export let setContext = action(
    PollVoteAction.setContext,
    (context: actionSDK.ActionSdkContext) => ({
        context: context,
    })
);

export let setProgressStatus = action(
    PollVoteAction.setProgressStatus,
    (status: Partial<VoteProgressStatus>) => ({
        status: status
    })
);

export let setAction = action(
    PollVoteAction.setAction,
    (action: actionSDK.Action) => ({
        action: action,
    })
);

export let setMyRow = action(
    PollVoteAction.setMyRow,
    (myRow: actionSDK.ActionDataRow) => ({
        myRow: myRow,
    })
);

export let setVoteCard = action(
    PollVoteAction.setVoteCard,
    (voteCard: VoteCardEnum) => ({
        voteCard: voteCard,
    })
);

export let vote = action(
    PollVoteAction.vote,
    (voteCard: VoteCardEnum, isUpdate?: boolean) => ({
        voteCard: voteCard, isUpdate: isUpdate
    })
);

export let fetchAction = action(PollVoteAction.fetchAction);

export let fetchMyRow = action(PollVoteAction.fetchMyRow);

export let setIsActionDeleted = action(PollVoteAction.setIsActionDeleted, (isActionDeleted: boolean) => ({
    isActionDeleted: isActionDeleted
}));