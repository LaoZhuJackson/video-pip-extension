// 检测页面中所有video元素
const videos = document.querySelectorAll('video');

// 发送视频信息给background
chrome.runtime.sendMessage({
    type: 'VIDEO_DETECTED',
    videoCount: videos.length
});

chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'VIDEO_CONTROL') {
        const video = document.querySelector('video');
        if (video) {
            switch(msg.command) {
                case 'play-pause':
                    video.paused ? video.play() : video.pause();
                    break;
                case 'seek-forward':
                    video.currentTime += 10;
                    break;
                case 'seek-backward':
                    video.currentTime -= 10;
                    break;
            }
        }
    }
});