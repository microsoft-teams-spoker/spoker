import {mutator} from "satcheljs";
import {setAction, setContext, setMyRow, setProgressStatus, setVoteCard, setVoteCardActionDataRow} from "./../actions/VoteActions";
import getStore from "./../store/VoteStore";

/**
 * Vote view mutators to modify store data on which vote view relies
 */

mutator(setContext, (msg) => {
    const store = getStore();
    store.context = msg.context;
});

mutator(setProgressStatus, (msg) => {
    const store = getStore();
    store.progressStatus = {
        ...getStore().progressStatus,
        ...msg.status,
    };
});

mutator(setAction, (msg) => {
    const store = getStore();
    store.action = msg.action;
});

mutator(setMyRow, (msg) => {
    const store = getStore();
    store.myRow = msg.myRow;
});

mutator(setVoteCardActionDataRow, (msg) => {
    const store = getStore();
    store.voteCardActionDataRow = msg.voteCardActionDataRow;
});

mutator(setVoteCard, (msg) => {
    const store = getStore();
    store.voteCard = msg.voteCard;
});