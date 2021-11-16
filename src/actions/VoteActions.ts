import * as actionSDK from "@microsoft/m365-action-sdk";
import {action} from "satcheljs";
import {ProgressState} from "../utils/SharedEnum";
import {VoteCardEnum} from "../components/VoteCard/VoteCard";

export enum PollVoteAction {
    initialize = "initialize",
    setContext = "setContext",
    setAction = "setAction",
    setProgressState = "setProgressState",
    setVoteCard = "setVoteCard",
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

export let setAction = action(
    PollVoteAction.setAction,
    (action: actionSDK.Action) => ({
        action: action,
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
    (voteCard: VoteCardEnum, isUpdate: boolean) => ({
        voteCard: voteCard, isUpdate: isUpdate

    })
);

export let setIsActionDeleted = action(PollVoteAction.setIsActionDeleted, (isActionDeleted: boolean) => ({
    isActionDeleted: isActionDeleted
}));