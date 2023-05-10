let selectedYoutubeChannelIndex = 0;

const youtubeChannels = [
    'https://www.youtube.com/channel/UCX9-cJy8dZWDI8hCnmahuLA',
    'https://www.youtube.com/c/Russia24TV',
    'https://www.youtube.com/c/TASSagency',
    'https://www.youtube.com/user/rianovosti',
    'https://www.youtube.com/channel/UC8Nl7TQLC6eX8MTRCuAw3SA',
    'https://www.youtube.com/channel/UCGRcod_jR4sC9XUMLCv4GJQ',
    'https://www.youtube.com/channel/UCSqO8lV-ric7ow5G5q9roWw',
    'https://www.youtube.com/channel/UCdyhZX5wt6B6dSIAT7X9dNw',
    'https://www.youtube.com/channel/UCRHhScZmH-SfBin8tbTixPA',
    'https://www.youtube.com/channel/UC3rZ3DKoeiccjl-e-lams_g',
    'https://www.youtube.com/channel/UCJvDYmmZDbeDy5N_aBxXjpA',
    'https://www.youtube.com/channel/UCMTaJV_Gyp1YOWJwSNa0wRw',
    'https://www.youtube.com/channel/UC8lCS8Ubv3t0-Tf4IYLioTA',
    'https://www.youtube.com/c/ZimaLive',
    'https://www.youtube.com/channel/UCQ4YOFsXjG9eXWZ6uLj2t2A',
    'https://www.youtube.com/channel/UCjxq8PsQ_On_-gI5LqNoVzA'
];

async function handleStartReporting() {
    try {
        console.log(11111);

        const handleClickWithDelay = (target) => {
            return new Promise((resolve) => {
                target.click();
                setTimeout(resolve, 5000);
            });
        }

        const findAboutButton = () => {
            const tabs = document.querySelectorAll('tp-yt-paper-tab');

            return tabs[tabs.length - 2];
        }

        const findFlagButton = () => {
            return document.querySelector('#right-column ytd-button-renderer');
        };

        const findReportUserButton = () => {
            return document.querySelectorAll('ytd-menu-popup-renderer tp-yt-paper-item')[3];
        };

        const findViolentButton = () => {
            return document.querySelectorAll('tp-yt-paper-radio-group tp-yt-paper-radio-button')[3];
        };

        const findSubmitButton = () => {
            const buttons = document.querySelectorAll('ytd-report-channel-modal-footer-renderer tp-yt-paper-button');
            return buttons[buttons.length - 1];
        };

        const handleSelectAllCheckboxes = () => {
            const checkboxNodes = document.querySelectorAll('tp-yt-paper-checkbox');

            checkboxNodes.forEach(node => node.click());

            return new Promise((resolve) => {
                setTimeout(resolve, 5000);
            });
        };

        const handleFillTextarea = () => {
            const textarea = document.getElementsByTagName('textarea')[0];

            function setNativeValue(element, value) {
                const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {}
                const prototype = Object.getPrototypeOf(element)
                const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {}

                if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
                    prototypeValueSetter.call(element, value)
                } else if (valueSetter) {
                    valueSetter.call(element, value)
                } else {
                    throw new Error('The given element does not have a value setter')
                }
            }
            setNativeValue(textarea, 'STOP RUSSIAN AGRESSION!!!')
            textarea.dispatchEvent(new Event('input', { bubbles: true }))

            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        };

        await handleClickWithDelay(findAboutButton());
        await handleClickWithDelay(findFlagButton());
        await handleClickWithDelay(findReportUserButton());
        await handleClickWithDelay(findViolentButton());
        await handleClickWithDelay(findSubmitButton());

        await handleSelectAllCheckboxes();

        await handleClickWithDelay(findSubmitButton());

        await handleFillTextarea();

        await handleClickWithDelay(findSubmitButton());
    } catch (error) {
        console.error(error);
        return true;
    }

    return true;
};

let isEnabled = false;
let timeoutBeforeScriptExecution = null;

const handleStartNewTabReporting = () => {
    isEnabled = true;

    console.log('BACKGROUND | "handleStartNewTabReporting" | Start');
    console.log('BACKGROUND | "handleStartNewTabReporting" | Trying to get "tabId"');
    chrome.tabs.query({ active: true, currentWindow: true }, (async tabs => {
        const tabId = tabs[0].id;

        console.log('tabId ==========', tabId);

        async function handleReportNextChannel() {
            clearTimeout(timeoutBeforeScriptExecution);

            console.log('isEnabled ==========', isEnabled);

            if (!isEnabled) {
                return;
            }

            console.groupCollapsed('BACKGROUND | "handleReportNextChannel" | Start');
            console.log('selectedYoutubeChannelIndex ==========', selectedYoutubeChannelIndex);
            console.log('tabId ==========', tabId);
            console.groupEnd();

            const selectedYoutubeChannel = youtubeChannels[selectedYoutubeChannelIndex];

            await chrome.tabs.update(tabId, {url: selectedYoutubeChannel });

            timeoutBeforeScriptExecution = setTimeout(function () {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    function: handleStartReporting,
                }, () => {
                    selectedYoutubeChannelIndex = selectedYoutubeChannelIndex + 1;

                    if (selectedYoutubeChannelIndex >= youtubeChannels.length) {
                        selectedYoutubeChannelIndex = 0;
                    }

                    console.log('New selectedYoutubeChannelIndex ==========', selectedYoutubeChannelIndex);

                    handleReportNextChannel();
                });
            }, 10000);
        }

        await handleReportNextChannel();
    }));
}

const handleStopNewTabReporting = () => {
    isEnabled = false;
    clearInterval(timeoutBeforeScriptExecution);
};

chrome.runtime.onMessage.addListener((message) => {
    const { type } = message;
    handleStartNewTabReporting
    if (type === 'START') {
        console.log(`BACKGROUND | "START" command received`)
        handleStartNewTabReporting();
    }

    if (type === 'STOP') {
        console.log(`BACKGROUND | "START" command received`)
        handleStopNewTabReporting();
    }
});
