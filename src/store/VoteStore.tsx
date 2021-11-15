import * as actionSDK from "@microsoft/m365-action-sdk";
import { createStore } from "satcheljs";
import "./../mutator/VoteMutator";
import "./../orchestrators/VoteOrchestrator";
import { ProgressState } from "./../utils/SharedEnum";

/**
 * Vote view store containing all the required data
 */

interface IPollVoteStore {
    context: actionSDK.ActionSdkContext;
    progressState: ProgressState;
}

const store: IPollVoteStore = {
    context: null,
    progressState: ProgressState.NotStarted,
};

export default createStore<IPollVoteStore>("voteStore", store);
