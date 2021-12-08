import * as actionSDK from "@microsoft/m365-action-sdk";
import {createStore} from "satcheljs";
import "./../mutator/VoteMutator";
import "./../orchestrators/VoteOrchestrator";
import {ProgressState} from "./../utils/SharedEnum";
import {VoteCardEnum} from "../components/VoteCard/VoteCard";

export interface VoteProgressStatus {
    context: ProgressState;
    action: ProgressState;
    myRow: ProgressState;
}

interface IPollVoteStore {
    context: actionSDK.ActionSdkContext;
    action: actionSDK.Action;
    myRow: actionSDK.ActionDataRow;
    voteCardActionDataRow: actionSDK.ActionDataRow;
    voteCard: VoteCardEnum;
    progressStatus: VoteProgressStatus;
    isActionDeleted: boolean;
}

const store: IPollVoteStore = {
    context: null,
    action: null,
    myRow: null,
    voteCardActionDataRow: null,
    voteCard: null,
    progressStatus: {
        context: ProgressState.NotStarted,
        action: ProgressState.NotStarted,
        myRow: ProgressState.NotStarted,
    },
    isActionDeleted: false
};

export default createStore<IPollVoteStore>("voteStore", store);
