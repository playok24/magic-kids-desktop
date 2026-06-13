const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    fullscreenToggle: () => ipcRenderer.send("fullscreen-toggle"),
    fullscreenEnter: () => ipcRenderer.send("fullscreen-enter"),
    fullscreenExit: () => ipcRenderer.send("fullscreen-exit"),
    counterFetch: (url) => ipcRenderer.invoke("counter-fetch", url),
    onUpdateAvailable: (fn) => ipcRenderer.on("update-available", fn),
    onUpdateProgress: (fn) => ipcRenderer.on("update-progress", (_, p) => fn(p)),
    onUpdateDownloaded: (fn) => ipcRenderer.on("update-downloaded", fn),
    installUpdate: () => ipcRenderer.send("install-update")
});
