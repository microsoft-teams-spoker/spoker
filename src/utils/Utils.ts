// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as uuid from "uuid";

export namespace Utils {
    export let DEFAULT_LOCALE: string = "en";

    /**
     * Method to check whether the obj param is empty or not
     * @param obj
     */
    export function isEmpty(obj: any): boolean {
        if (obj == undefined || obj == null) {
            return true;
        }

        let isEmpty = false; // isEmpty will be false if obj type is number or boolean so not adding a check for that

        if (typeof obj === "string") {
            isEmpty = (obj.trim().length == 0);
        } else if (Array.isArray(obj)) {
            isEmpty = (obj.length == 0);
        } else if (typeof obj === "object") {
            isEmpty = (JSON.stringify(obj) == "{}");
        }
        return isEmpty;
    }

    /**
     * Method to get the expiry date
     * @param activeDays number of days action will be active
     */
    export function getDefaultExpiry(activeDays: number): Date {
        let date: Date = new Date();
        date.setDate(date.getDate() + activeDays);

        // round off to next 30 minutes time multiple
        if (date.getMinutes() > 30) {
            date.setMinutes(0);
            date.setHours(date.getHours() + 1);
        } else {
            date.setMinutes(30);
        }
        return date;
    }

    /**
     * Method to get the unique identifier
     */
    export function generateGUID(): string {
        return uuid.v4();
    }

    /**
     * Method to check whether the text direction is right-to-left or not
     * @param locale
     */
    export function isRTL(locale: string): boolean {
        let rtlLang: string[] = ["ar", "he", "fl"];
        if (locale && rtlLang.indexOf(locale.split("-")[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Method to provide accessibility
     * @param text
     */
    export function announceText(text: string) {
        let ariaLiveSpan: HTMLSpanElement = document.getElementById(
            "aria-live-span"
        );
        if (ariaLiveSpan) {
            ariaLiveSpan.innerText = text;
        } else {
            ariaLiveSpan = document.createElement("SPAN");
            ariaLiveSpan.style.cssText =
                "position: fixed; overflow: hidden; width: 0px; height: 0px;";
            ariaLiveSpan.id = "aria-live-span";
            ariaLiveSpan.innerText = "";
            ariaLiveSpan.setAttribute("aria-live", "polite");
            ariaLiveSpan.tabIndex = -1;
            document.body.appendChild(ariaLiveSpan);
            setTimeout(() => {
                ariaLiveSpan.innerText = text;
            }, 50);
        }
    }
}
