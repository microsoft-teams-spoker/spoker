// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {VoteCardEnum, VoteCardType} from "./VoteCard";

export namespace VoteCardUtils {

    export function getType(voteCardEnum: VoteCardEnum): VoteCardType {
        switch (voteCardEnum) {
            case VoteCardEnum.CARD_1:
            case VoteCardEnum.CARD_2:
            case VoteCardEnum.CARD_3:
            case VoteCardEnum.CARD_5:
            case VoteCardEnum.CARD_8:
            case VoteCardEnum.CARD_13:
            case VoteCardEnum.CARD_21:
                return VoteCardType.FIBO;
            case VoteCardEnum.CARD_XS:
            case VoteCardEnum.CARD_S:
            case VoteCardEnum.CARD_M:
            case VoteCardEnum.CARD_L:
            case VoteCardEnum.CARD_XL:
                return VoteCardType.TSHIRT;
            case VoteCardEnum.CARD_QUESTIONMARK:
            case VoteCardEnum.CARD_COFFEE:
            case VoteCardEnum.CARD_INFINITY:
                return VoteCardType.OTHER;
            default:
                throw new Error("Unknown vote card: " + voteCardEnum);
        }
    }
}
