import {mutator} from "satcheljs";
import {setAction, setContext, setMyRow, setProgressStatus, setVoteCard} from "./../actions/VoteActions";
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

mutator(setVoteCard, (msg) => {
    const store = getStore();
    console.log("1 mutuator setVoteCard store: " + JSON.stringify(store));

    store.voteCard = msg.voteCard;
    console.log("2 mutuator setVoteCard store: " + JSON.stringify(store));

});