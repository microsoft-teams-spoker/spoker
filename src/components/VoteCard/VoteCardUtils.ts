// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {VoteCardEnum, VoteCardType} from "./VoteCard";

export namespace VoteCardUtils {

    export function getType(voteCardEnum: VoteCardEnum): VoteCardType {
        switch (voteCardEnum) {
            case VoteCardEnum.C1:
            case VoteCardEnum.C2:
            case VoteCardEnum.C3:
            case VoteCardEnum.C5:
            case VoteCardEnum.C8:
            case VoteCardEnum.C13:
            case VoteCardEnum.C21:
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
