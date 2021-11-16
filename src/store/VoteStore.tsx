import * as actionSDK from "@microsoft/m365-action-sdk";
import {createStore} from "satcheljs";
import "./../mutator/VoteMutator";
import "./../orchestrators/VoteOrchestrator";
import {ProgressState} from "./../utils/SharedEnum";
import {VoteCardEnum} from "../components/VoteCard/VoteCard";

/**
 * Vote view store containing all the required data
 */

interface IPollVoteStore {
    context: actionSDK.ActionSdkContext;
    action: actionSDK.Action;
    progressState: ProgressState;
    voteCard: VoteCardEnum;
}

const store: IPollVoteStore = {
    context: null,
    action: null,
    progressState: ProgressState.NotStarted,
    voteCard: null
};

export default createStore<IPollVoteStore>("voteStore", store);
