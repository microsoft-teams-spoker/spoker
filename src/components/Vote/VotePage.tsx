import {Button, Flex, FlexItem, Loader} from "@fluentui/react-northstar";
import {observer} from "mobx-react";
import * as React from "react";
import {ActionSdkHelper} from "../../helper/ActionSdkHelper";
import {Localizer} from "../../utils/Localizer";
import {ErrorView} from "../ErrorView";
import getStore from "./../../store/VoteStore";
import {ProgressState} from "./../../utils/SharedEnum";
import {UxUtils} from "./../../utils/UxUtils";
import "./vote.scss";
import {vote} from "../../actions/VoteActions";

/**
 * <VotePage> component for vote view
 * @observer decorator on the component this is what tells MobX to rerender the component whenever the data it relies on changes.
 */
@observer
export default class VotePage extends React.Component<any, any> {

    render() {
        let progressState = getStore().progressState;
        if (progressState === ProgressState.NotStarted || progressState == ProgressState.InProgress) {
            return <Loader/>;
        } else if (progressState === ProgressState.Failed) {
            ActionSdkHelper.hideLoadingIndicator();
            return (
                <ErrorView
                    title={Localizer.getString("GenericError")}
                    buttonTitle={Localizer.getString("Close")}
                />
            );
        } else {
            // Render View
            ActionSdkHelper.hideLoadingIndicator();
            if (UxUtils.renderingForMobile()) {
                return (
                    <>
                        <Flex className="body-container no-mobile-footer">
                            <div>This is vote page for mobile</div>
                        </Flex>
                        {this.renderFooterSection(true)}
                    </>
                );
            } else {
                return (
                    <>
                        <Flex gap="gap.medium" column className="body-container">
                            <div>This is vote page</div>
                            <FlexItem push>
                                <Button
                                    primary
                                    content={"Send a vote"}
                                    onClick={() => {
                                        vote();
                                    }}>
                                </Button>
                            </FlexItem>
                        </Flex>
                        {this.renderFooterSection()}
                    </>
                );
            }
        }
    }

    /**
     * Helper function to provide footer for main page
     * @param isMobileView true or false based of whether its for mobile view or not
     */
    renderFooterSection(isMobileView?: boolean) {
        let className = isMobileView ? "" : "footer-layout";
        return (
            <Flex className={className} gap={"gap.smaller"}>
                <div>This is footer</div>
            </Flex>
        );
    }

}
