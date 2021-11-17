import {Flex, Loader} from "@fluentui/react-northstar";
import {observer} from "mobx-react";
import * as React from "react";
import {ActionSdkHelper} from "../../helper/ActionSdkHelper";
import {Localizer} from "../../utils/Localizer";
import {ErrorView} from "../ErrorView";
import getStore from "./../../store/VoteStore";
import {ProgressState} from "./../../utils/SharedEnum";
import {UxUtils} from "./../../utils/UxUtils";
import "./vote.scss";
import {VoteCard, VoteCardEnum} from "../VoteCard/VoteCard";
import {setVoteCard, vote} from "../../actions/VoteActions";

/**
 * <VotePage> component for vote view
 * @observer decorator on the component this is what tells MobX to rerender the component whenever the data it relies on changes.
 */
@observer
export default class VotePage extends React.Component<any, any> {

    render() {
        const progressStatus = getStore().progressStatus;
        console.log("VotePage statusProgress: " + JSON.stringify(progressStatus));

        if (progressStatus.context == ProgressState.Failed ||
            progressStatus.action == ProgressState.Failed ||
            progressStatus.myRow == ProgressState.Failed) {
            ActionSdkHelper.hideLoadingIndicator();
            return (
                <ErrorView
                    title={Localizer.getString("GenericError")}
                    buttonTitle={Localizer.getString("Close")}
                />
            );
        } else if (progressStatus.context != ProgressState.Completed ||
            progressStatus.action != ProgressState.Completed ||
            progressStatus.myRow != ProgressState.Completed) {
            return <Loader/>;
        } else {
            // Render View
            ActionSdkHelper.hideLoadingIndicator();
            if (UxUtils.renderingForMobile()) {
                return this.renderForMobile();
            } else {
                return this.renderForWebOrDesktop();
            }
        }
    }

    private renderForMobile() {
        return (
            <>
                <Flex className="body-container no-mobile-footer">
                    {this.renderVoteCards()}
                </Flex>
                {this.renderFooterSection(true)}
            </>
        );
    }

    private renderForWebOrDesktop() {
        return (
            <>
                <Flex gap="gap.medium" column className="body-container">
                    {this.renderVoteCards()}
                </Flex>
                {this.renderFooterSection()}
            </>
        );
    }

    private renderVoteCards() {
        const voteCardEnums = this.getVoteCardEnums();

        return <div>
            <Flex className="vote-card-row">
                {voteCardEnums.map(value => (
                    <VoteCard card={value} renderForMobile={UxUtils.renderingForMobile()} onClick={() => this.voteCardOnClick(value)}/>
                ))}
            </Flex>
            <Flex className="your-vote-card">
                {this.renderYourVote()}
            </Flex>
        </div>;
    }

    private renderFooterSection(isMobileView?: boolean) {
        let className = isMobileView ? "" : "footer-layout";
        return (
            <Flex className={className} gap={"gap.smaller"}>
                <div>Please remember. You can vote only once and you can not change you vote!</div>
            </Flex>
        );
    }

    private getVoteCardEnums(): VoteCardEnum[] {
        return getStore().action.dataTables[0].dataColumns[0].options.map(value => {
            const voteCardEnum: VoteCardEnum = parseInt(value.name);
            return voteCardEnum;
        });
    }

    private voteCardOnClick(value: VoteCardEnum) {
        const lastVoteCard = getStore().voteCard;
        console.log("1 voteCardOnClick getStore().voteCard: " + lastVoteCard);
        if (lastVoteCard == null) {
            console.log("2 voteCardOnClick");
            setVoteCard(value);
            console.log("3 voteCardOnClick");
            vote(value);
            console.log("4 voteCardOnClick");
        }
    }

    private renderYourVote() {
        const lastVoteCard = getStore().voteCard;
        if (lastVoteCard != null) {
            return <p>Your vote: <VoteCard card={lastVoteCard} renderForMobile={UxUtils.renderingForMobile()}/></p>;
        } else {
            return <p></p>;
        }
    }
}
