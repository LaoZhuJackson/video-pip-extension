// 获取视频流并播放
const video = document.getElementById('pip-video');
const streamId = new URLSearchParams(location.search).get('streamId');

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        mandatory: {
            chromeMediaSource: 'tab',
            chromeMediaSourceId: streamId
        }
    }
}).then(stream => {
    video.srcObject = stream;
});

// 窗口置顶逻辑
chrome.windows.getCurrent(window => {
    chrome.windows.update(window.id, { focused: true, state: 'minimized' });
    setTimeout(() => {
        chrome.windows.update(window.id, { state: 'normal', drawAttention: true });
    }, 300);
});