import { mutator } from "satcheljs";
import { setContext, setProgressState } from "./../actions/VoteActions";
import getStore from "./../store/VoteStore";

/**
 * Vote view mutators to modify store data on which vote view relies
 */

mutator(setContext, (msg) => {
  const store = getStore();
  store.context = msg.context;
});

mutator(setProgressState, (msg) => {
  const store = getStore();
  store.progressState = msg.state;
});
