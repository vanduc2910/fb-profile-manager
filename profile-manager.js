const fs = require('fs');

const filePath = 'profiles.json';

// Ensure JSON file exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

class ProfileManager {
    constructor() {
        this.loadProfiles();
    }

    loadProfiles() {
        const data = fs.readFileSync(filePath);
        this.profiles = JSON.parse(data);
    }

    saveProfiles() {
        fs.writeFileSync(filePath, JSON.stringify(this.profiles, null, 2));
    }

    create(profile) {
        profile.id = this.profiles.length ? this.profiles[this.profiles.length - 1].id + 1 : 1;
        profile.created_at = new Date().toISOString();
        this.profiles.push(profile);
        this.saveProfiles();
    }

    read(id) {
        return this.profiles.find(profile => profile.id === id);
    }

    update(id, updatedProfile) {
        const index = this.profiles.findIndex(profile => profile.id === id);
        if (index !== -1) {
            updatedProfile.created_at = this.profiles[index].created_at; // maintain created_at
            this.profiles[index] = { ...this.profiles[index], ...updatedProfile };
            this.saveProfiles();
        }
    }

    delete(id) {
        this.profiles = this.profiles.filter(profile => profile.id !== id);
        this.saveProfiles();
    }

    getAll() {
        return this.profiles;
    }
}

module.exports = new ProfileManager();
