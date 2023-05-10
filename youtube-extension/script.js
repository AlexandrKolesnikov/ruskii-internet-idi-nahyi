const btnStartNode = document.getElementById('btn');

let isEnabled = false;

const handleChangeState = () => {
    chrome.storage.local.set({ isEnabled: isEnabled });

    if (isEnabled) {
        document.body.style.backgroundColor = 'white';
        btnStartNode.textContent = 'Start';

        chrome.runtime.sendMessage({ type: 'STOP' });
    } else {
        document.body.style.backgroundColor = 'green';
        btnStartNode.textContent = 'Stop';

        chrome.runtime.sendMessage({ type: 'START' });
    }
}

chrome.storage.local.get('isEnabled', data => {
    isEnabled = !!data.isEnabled;

    handleChangeState();
});

btnStartNode.addEventListener('click', () => {
    isEnabled = !isEnabled;

    handleChangeState();
});
