// Preload.js - Security bridge between main and renderer process

const { contextBridge, ipcMain } = require('electron');

// Expose limited APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        // Whitelist of allowed channels
        let validChannels = ['create-profile', 'delete-profile', 'open-profile', 'toggle-theme'];
        if (validChannels.includes(channel)) {
            ipcMain.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['profile-created', 'profile-deleted', 'theme-changed'];
        if (validChannels.includes(channel)) {
            ipcMain.on(channel, (event, ...args) => func(...args));
        }
    },
});