import * as React from "react";
import * as ReactDom from "react-dom";
import { initialize } from "./actions/VoteActions";
import { ActionRootView } from "./components/ActionRootView";
import VotePage from "./components/Vote/VotePage";

initialize();
ReactDom.render(
    <ActionRootView>
        <VotePage />
    </ActionRootView>,
    document.getElementById("root"));
