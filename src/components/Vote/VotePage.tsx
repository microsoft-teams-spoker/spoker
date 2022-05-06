import {Flex, Text, Loader, FlexItem, Button} from "@fluentui/react-northstar";
import {observer} from "mobx-react";
import * as React from "react";
import {ActionSdkHelper} from "../../helper/ActionSdkHelper";
import {Localizer} from "../../utils/Localizer";
import {ErrorView} from "../ErrorView";
import getStore from "./../../store/VoteStore";
import {ProgressState} from "./../../utils/SharedEnum";
import {UxUtils} from "./../../utils/UxUtils";
import "./VotePage.scss";
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
        const baseVoteCards = voteCardEnums.slice(0, 5);
        let additionalVoteCards = [];
        let mapVoteCardWithText = [];
        if (voteCardEnums.length > 5) {
            additionalVoteCards = voteCardEnums.slice(5, 8);
            mapVoteCardWithText = [{value: additionalVoteCards[0], key: "I'm not sure"}, 
                         {value: additionalVoteCards[1], key: "I need a break"},
                         {value: additionalVoteCards[2], key: "The task cannot be completed"}]
        }
        const selectedVoteCard = getStore().voteCard;

        return <div className="vote-card-section">
            <Text className="pick-text"
                content="Please pick the card which reflects the best your estimation:"
            />
            <Flex className="vote-card-row">
                {baseVoteCards.map(value => {
                    return <div className="vote-card">
                        <VoteCard card={value} isSelected={value == selectedVoteCard} renderForMobile={UxUtils.renderingForMobile()} onClick={() => this.setCardOnClick(value)}/>
                    </div>
                })}
            </Flex>
            { additionalVoteCards.length > 0 && <Flex className="vote-card-row">
                {mapVoteCardWithText.map(map => {
                    return <div className="vote-card-with-text">
                        <div className="vote-card">
                        <VoteCard card={map.value} isSelected={map.value == selectedVoteCard} renderForMobile={UxUtils.renderingForMobile()} onClick={() => this.setCardOnClick(map.value)}/>
                        </div>
                        <Text className="card-text" content={map.key}/>
                    </div> 
                    })}
            </Flex> }
            {/* <Flex className="your-vote-card">
                {this.renderYourVote()}
            </Flex> */}
        </div>;
    }

    private renderFooterSection(isMobileView?: boolean) {
        let className = isMobileView ? "" : "footer-layout";
        const selectedVoteCard = getStore().voteCard;
        return (
            <Flex className={className} gap={"gap.smaller"}>

                <Text
                    content="You can change your vote any time!"
                />
                <FlexItem push>
                    <Button
                        primary
                        disabled={selectedVoteCard == null || undefined}
                        content={Localizer.getString("Submit")}
                        onClick={() => {
                            this.voteCardOnClick(selectedVoteCard);
                        }}>
                    </Button>
                </FlexItem>
            </Flex>);
    }

    private getVoteCardEnums(): VoteCardEnum[] {
        return getStore().action.dataTables[0].dataColumns[0].options.map(value => {
            const voteCardEnum: VoteCardEnum = parseInt(value.name);
            return voteCardEnum;
        });
    }

    private voteCardOnClick(value: VoteCardEnum) {
        vote(value);
        ActionSdkHelper.closeView();
    }

    private setCardOnClick(value: VoteCardEnum) {
        setVoteCard(value);
    }

    private renderYourVote() {
        const lastVoteCard: VoteCardEnum = getStore().voteCard;
        if (lastVoteCard != null) {
            return <p>Your vote: <VoteCard card={lastVoteCard} renderForMobile={UxUtils.renderingForMobile()}/></p>;
        } else {
            return <p></p>;
        }
    }
}
