// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {VoteCardEnum, VoteCardType} from "./VoteCard";

export namespace VoteCardUtils {

    export function getType(voteCardEnum: VoteCardEnum): VoteCardType {
        switch (voteCardEnum) {
            case VoteCardEnum._1:
            case VoteCardEnum._2:
            case VoteCardEnum._3:
            case VoteCardEnum._5:
            case VoteCardEnum._8:
            case VoteCardEnum._13:
            case VoteCardEnum._21:
                return VoteCardType.FIBO;
            case VoteCardEnum.XS:
            case VoteCardEnum.S:
            case VoteCardEnum.M:
            case VoteCardEnum.L:
            case VoteCardEnum.XL:
                return VoteCardType.TSHIRT;
            case VoteCardEnum.QUESTIONMARK:
            case VoteCardEnum.COFFEE:
            case VoteCardEnum.INFINITY:
                return VoteCardType.OTHER;
            default:
                throw new Error("Unknown vote card: " + voteCardEnum);
        }
    }
}
