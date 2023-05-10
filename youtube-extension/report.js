handleClickWithDelay = (target) => {
    return new Promise((resolve) => {
        target.click();
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

findAboutButton = () => {
    const tabs = document.querySelectorAll('tp-yt-paper-tab');
    const aboutTab = tabs[tabs.length - 2];

    return aboutTab;
}

findFlagButton = () => {
    const button = document.querySelector('#right-column ytd-button-renderer');
    return button;
};

findReportUserButton = () => {
    return document.querySelectorAll('ytd-menu-popup-renderer tp-yt-paper-item')[3];
};

findViolentButton = () => {
    return document.querySelectorAll('tp-yt-paper-radio-group tp-yt-paper-radio-button')[3];
};

findSubmitButton = () => {
    const buttons = document.querySelectorAll('ytd-report-channel-modal-footer-renderer tp-yt-paper-button');
    return buttons[buttons.length - 1];
};

handleSelectAllCheckboxes = () => {
    const checkboxNodes = document.querySelectorAll('tp-yt-paper-checkbox');

    checkboxNodes.forEach(node => node.click());

    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};

handleFillTextarea = () => {
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

    setNativeValue(textarea, 'STOP RUSSIAN AGRESSION!!!');

    textarea.dispatchEvent(new Event('input', { bubbles: true }))

    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};

handleStartReporting = async () => {
    const aboutButton = findAboutButton();

    await handleClickWithDelay(aboutButton);

    const flagButton = findFlagButton();

    await handleClickWithDelay(flagButton);

    const repotUserButton = findReportUserButton();

    await handleClickWithDelay(repotUserButton);

    const violentButton = findViolentButton();

    await handleClickWithDelay(violentButton);

    const nextButton = findSubmitButton();

    await handleClickWithDelay(nextButton);
    await handleSelectAllCheckboxes();

    const checkboxesSubmitButton = findSubmitButton();

    await handleClickWithDelay(checkboxesSubmitButton);
    await handleFillTextarea();

    const finalSubmitButton = findSubmitButton();

    await handleClickWithDelay(finalSubmitButton);

    handleStartReporting();
};

handleStartReporting();
