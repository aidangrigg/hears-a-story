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
  private readonly maxTokenLength = 100; // TODO: actually check how long the max token length is
  private isPlaying = false;

  private static async fetchAudio(text: string) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_HOST}/api/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    // Convert the recieved API data to a base64 data URI
    return response
      .blob()
      .then((bob_the_blob) => blobToBase64URI(bob_the_blob));
  }

  private async playAudio(dataUri: string, onFinishCallback?: () => void) {
    // Create the sound from the base64 data URI, with a callback
    // to unload the audio once it is done to avoid a memory leak
    const { sound } = await ExpoAudio.Sound.createAsync({
      uri: dataUri
    }, {}, (status) => {

      let statusSuccess = status as AVPlaybackStatusSuccess;
      this.isPlaying = statusSuccess.isPlaying;

      if (statusSuccess.didJustFinish) {
        console.trace("[tts:ServerTTS] Unloading audio...");
        sound.unloadAsync();
        if (onFinishCallback) {
          onFinishCallback();
        }
      }
    });

    console.trace("[tts:ServerTTS] Playing audio...");
    await sound.playAsync();
  }

  async speak(text: string, options: TTSOptions): Promise<void> {

    // If the text is too long for the TTS engine, break it up into smaller chunks and play it.
    // Otherwise, just play it.
    if (text.length >= this.maxTokenLength) {
      let processedText = processTTSText(text, this.maxTokenLength);

      // Fetch all the data needed
      // OPTIMIZE: would be cool if we could play the audio as it's being fetched,
      // rather then having to wait for everything to be fetched. Audio also seems to be
      // fetched in groups of 8, might be good to increase that.
      let dataURIs = await Promise.all(processedText.map((chunk) => {
        return ServerTTS.fetchAudio(chunk);
      }));

      let iter = dataURIs[Symbol.iterator]();

      const callback = () => {
        let val = iter.next();
        if(!val.done) {
          this.playAudio(val.value, callback); // not sure how this is legal :think:
        }
      }

      await this.playAudio(iter.next().value, callback);
    } else {
      let dataURI = await ServerTTS.fetchAudio(text);
      await this.playAudio(dataURI);
    }
  }

  async isSpeaking(): Promise<boolean> {
    return new Promise((res) => res(this.isPlaying));
  }
}


class NativeTTS implements TTSProvider {

  // NOTE: the firefox TTS does not run the "onDone" callback, meaning that if
  // this function is called on firefox the tts playback will be cut short.
  // (maybe check if chrome's TTS works better)
  // However, this works fine on android, and IOS does not have a limit to TTS length.
  private speakRecurse(value: string, iter: IterableIterator<string>) {
    ExpoSpeech.speak(value, {
      onDone: () => {
        const next = iter.next();
        if (!next.done) {
          this.speakRecurse(next.value, iter);
        }
      }
    });
  }

  // TODO: handle options
  async speak(text: string, options: TTSOptions): Promise<void> {
    const maxTokenLength = ExpoSpeech.maxSpeechInputLength;

    // If the text is too long for the TTS engine, break it up into smaller chunks and play it.
    // Otherwise, just play it.
    if (text.length >= maxTokenLength) {
      let processedText = processTTSText(text, maxTokenLength);
      let iter = processedText[Symbol.iterator]();
      this.speakRecurse(iter.next().value, iter);
    } else {
      ExpoSpeech.speak(text);
    }

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
    for (let i = this.current_provider_index; i < this.providers.length; i++) {
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

function processTTSText(text: string, maxLength: number): string[] {
  let sentences = text.split(". ");

  let aboveMaxLength = sentences.filter((sentence) => sentence.length >= maxLength);
  // return the sentences as long as all the sentences are
  // below the max length
  if (aboveMaxLength.length <= 0) {
    return sentences;
  }

  // try splitting by commas
  let processedText = sentences.flatMap((sentence) => sentence.split(","));
  if (!processedText.some((val) => val.length >= maxLength)) {
    return processedText;
  }

  // TODO: implement splitting by 1 space in the middle of the sentence
  console.assert(false, "Not implemented");
  return [];
}
