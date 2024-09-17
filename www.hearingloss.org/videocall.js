const videoCallConfig = {
    turnOnMicrophoneWhenJoining: true,
    turnOnCameraWhenJoining: true,
    showMyCameraToggleButton: true,
    showMyMicrophoneToggleButton: true,
    showAudioVideoSettingsButton: true,
    showScreenSharingButton: true,
    showTextChat: true,
    showUserList: true,
    maxUsers: 2,
    layout: "Auto",
    showLayoutButton: false,
    scenario: {
        mode: "OneONoneCall",
        config: {
            role: "Host",
        },
    },
};

// Initialize the video call functionality
function startVideoCall() {
    // Here you would include the logic to connect the video call API or service,
    // using the configuration object (videoCallConfig)
    // Example: videoCallService.initialize(videoCallConfig);
    console.log("Video call started with configuration:", videoCallConfig);
}

// Event listener for the start call button
document.getElementById('startCall').addEventListener('click', startVideoCall);
