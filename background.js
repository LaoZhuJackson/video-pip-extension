chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type === 'VIDEO_DETECTED') {
        chrome.tabCapture.capture({
            video: true,
            audio: true
        }, stream => {
            // 创建浮动窗口并传递stream
            chrome.windows.create({
                url: chrome.runtime.getURL('popup.html') + '?streamId=' + stream.id,
                type: 'panel',
                focused: true
            });
        });
    }
});

chrome.commands.onCommand.addListener(command => {
    chrome.tabs.query({active: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'VIDEO_CONTROL',
            command: command
        });
    });
});