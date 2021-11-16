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
        //                    "id": "${action.dataTables[0].dataColumns[0].name}",
        // {stations.map(station => (
        //     <div key={station.call} className='station'>{station.call}</div>
        // ))}

        // {voteCardEnums.map(value => (
        //     <VoteCard card={value} renderForMobile={UxUtils.renderingForMobile()} onClick={() => this.voteCardOnClick(value)}/>
        // ))}

        const voteCardEnums = this.getVoteCardEnums();
        console.log("voteCardEnums: " + voteCardEnums.length);

        return <Flex>
            {voteCardEnums.map(value => (
                <VoteCard card={value} renderForMobile={UxUtils.renderingForMobile()} onClick={() => this.voteCardOnClick(value)}/>
            ))}
        </Flex>;
    }

    private renderFooterSection(isMobileView?: boolean) {
        let className = isMobileView ? "" : "footer-layout";
        return (
            <Flex className={className} gap={"gap.smaller"}>
                <div>This is footer</div>
            </Flex>
        );
    }

    private getVoteCardEnums(): VoteCardEnum[] {
        console.log("options: " + JSON.stringify(getStore().action.dataTables[0].dataColumns[0].options));
        return getStore().action.dataTables[0].dataColumns[0].options.map(value => {
            console.log("o: " + value.name);
            const voteCardEnum: VoteCardEnum = parseInt(value.name);
            console.log("v: " + voteCardEnum);
            return voteCardEnum;
        });
    }

    private voteCardOnClick(value: VoteCardEnum) {
        console.log("getStore().voteCard: " + getStore().voteCard);
        const isUpdate = !!getStore().voteCard;
        console.log("isUpdate: " + isUpdate);
        setVoteCard(value);
        vote(value, isUpdate);
    }
}
