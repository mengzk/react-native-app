/**
 * Author: Meng
 * Date: 2024-09-03
 * Modify: 2024-09-03
 * Desc:
 */
/**
 * Author: Meng
 * Date: 2024-09-03
 * Modify: 2024-09-03
 * Desc: 录音工具类
 */

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
} from 'react-native-audio-recorder-player';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';

const audioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVModeIOS: AVModeIOSOption.measurement,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
};
const meteringEnabled = false;

export default class AudioRecord {
  audioRecorder = null;

  constructor() {
    const recorder = new AudioRecorderPlayer();
    recorder.setSubscriptionDuration(0.5);
    this.audioRecorder = recorder;
  }

  /**
   * 开始录音
   */
  async start(listener) {
    const granted = await this._recordPermission();
    if (!granted) {
      return;
    }
    const path = `${RNFS.ExternalDirectoryPath}/demo123.aac`;
    // console.log('------> AudioRecord path ', path);
    this.audioRecorder.startRecorder(path, audioSet, false);
    this.audioRecorder.addRecordBackListener(e => {
      // console.log('------> AudioRecord ', e);
      const recordSecs = Math.floor(e.currentPosition);
      const recordTime = this.audioRecorder.mmssss(recordSecs);
      // console.log('------> AudioRecord ', recordSecs, recordTime);
      if(listener) {
        listener({secs: recordSecs, time: recordTime, path});
      }
    });
  }

  /**
   * 暂停录音
   */
  pause() {
    this.audioRecorder.pauseRecorder();
  }

  /**
   * 继续录音
   */
  resume() {
    this.audioRecorder.resumeRecorder();
  }

  /**
   * 停止录音
   */
  stop() {
    this.audioRecorder.stopRecorder();
    this.audioRecorder.removeRecordBackListener();
  }

  /**
   * 播放录音
   * @param path 录音文件路径
   */
  async play(path, listener) {
    if(!path) {
      console.warn('------> AudioRecord 地址不能为空');
      return;
    }
    const granted = await this._recordPermission();
    if (!granted) {
      return;
    }

    this.audioRecorder.startPlayer(path);
    this.audioRecorder.addPlayBackListener(e => {
      // console.log('------> AudioRecord ', e);
      const playSecs = Math.floor(e.currentPosition);
      const playTime = this.audioRecorder.mmssss(playSecs);
      console.log('------> AudioRecord ', playSecs, playTime);
      if(listener) {
        listener({secs: playSecs, time: playTime});
      }
      if (e.currentPosition === e.duration) {
        console.log('------> AudioRecord play end');
        this.stopPlay();
      }
    });
  }

  /**
   * 暂停播放
   */
  pausePlay() {
    this.audioRecorder.pausePlayer();
  }

  /**
   * 继续播放
   */
  resumePlay() {
    this.audioRecorder.resumePlayer();
  }

  /**
   * 停止播放
   */
  stopPlay() {
    this.audioRecorder.stopPlayer();
    this.audioRecorder.removePlayBackListener();
  }

  async _recordPermission() {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('------> AudioRecord ', grants);
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('------> AudioRecord permissions granted');
          return true;
        } else {
          console.log('------> AudioRecord All permissions not granted');
          return false;
        }
      } catch (err) {
        console.warn('------> AudioRecord err ', err);
        return false;
      }
    } else {
      // let result = await AudioModuleIOS.isAllowRecord();
      // return result;
    }
  }
}
