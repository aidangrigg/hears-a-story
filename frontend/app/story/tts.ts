import { blobToBase64URI } from "@/utils/audio";
import * as ExpoSpeech from "expo-speech";
import { Audio as ExpoAudio, AVPlaybackStatusSuccess } from "expo-av";

// TODO: actually add option handling
type TTSOptions = {

}

interface TTSProvider {
  speak: (text: string, options: TTSOptions) => Promise<void>
  isSpeaking: () => Promise<boolean>
}

class ServerTTS implements TTSProvider {
  private isPlaying = false;

  async speak(text: string, options: TTSOptions): Promise<void> {
    // Fetch the TTS data from the API; will return in audio/wav format.
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_HOST}/api/tts`, {
      method: "POST",
      headers: {
	"Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    // Convert the recieved API data to a base64 data URI
    const audioURI = await response
      .blob()
      .then((bob_the_blob) => blobToBase64URI(bob_the_blob));

    // Create the sound from the base64 data URI, with a callback
    // to unload the audio once it is done to avoid a memory leak
    const { sound } = await ExpoAudio.Sound.createAsync({
      uri: audioURI
    }, {}, (status) => {

      let statusSuccess = status as AVPlaybackStatusSuccess;
      this.isPlaying = statusSuccess.isPlaying;

      if(statusSuccess.didJustFinish) {
	console.trace("[tts:ServerTTS] Unloading audio...");
	sound.unloadAsync();
      }
    });

    console.trace("[tts:ServerTTS] Playing audio...");
    await sound.playAsync();
  }

  async isSpeaking(): Promise<boolean> {
    return new Promise((res) => res(this.isPlaying));
  }
}

class NativeTTS implements TTSProvider {
  async speak(text: string, options: TTSOptions): Promise<void> {
    // TODO: handle options
    ExpoSpeech.speak(text);
  }

  async isSpeaking(): Promise<boolean> {
    return ExpoSpeech.isSpeakingAsync();
  }
}

export class TTS {
  private providers: TTSProvider[] = [new ServerTTS, new NativeTTS]
  private current_provider_index: number = 0;

  /**
   * Plays audio via TTS.
   * Will fallback to device native TTS if server based TTS fails.
   */
  async speak(text: string, options: TTSOptions) {
    // TODO: break up the passed in text by sentence, to ensure the max
    // token length of the providers are not reached.
    for(let i = this.current_provider_index; i < this.providers.length; i++) {
      this.current_provider_index = i;
      try {
	return await this.providers[i].speak(text, options);
      } catch (e) {
	console.warn(`[tts] TTS provider [${i}] failed, `, e);
      }
    }
    console.error("[tts] All TTS providers have failed.");
  }

  /**
   * Will return true if the TTS is currently speaking.
   */
  async isSpeaking(): Promise<boolean> {
    return this.providers[this.current_provider_index].isSpeaking();
  }
}
