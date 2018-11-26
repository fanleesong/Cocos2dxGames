class AudioUtil
{
    constructor()
    {
        this._currentBgmAudioId = -1;
    }
    playBgm(path, volume = 1)
    {
        this._currentBgmAudioId = cc.audioEngine.play(path,true, volume);
    }

    playSfx(path, loop = false) { return cc.audioEngine.play(path, loop); }

    stopAllBgm() { cc.audioEngine.stopAll(); }

    stopAllSfx() { cc.audioEngine.stopAll(); }

    stopSfx(sfxId) { cc.audioEngine.stop(sfxId); }

    stopBgm() { cc.audioEngine.setVolume(this._currentBgmAudioId, 0); }

    pauseBgm() { cc.audioEngine.setVolume(this._currentBgmAudioId, 0); }

    resumeBgm() { cc.audioEngine.setVolume(this._currentBgmAudioId, 1); }

    pauseSfx(sfxId){ cc.audioEngine.pause(sfxId); }

    resumeSfx(sfxId){ cc.audioEngine.resume(sfxId); }
}

module.exports = AudioUtil;
