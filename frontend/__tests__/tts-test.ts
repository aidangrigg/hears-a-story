import { _private } from "../app/story/tts"

describe("processTTSText", () => {
  test("limits chunk length to max length", () => {
    let maxLength = 20;

    let text = `this is a sentence. \
    this is another sentence and this one is longer then 20 characters.`

    expect(
      _private.processTTSText(text, maxLength).some((chunk) => chunk.length > maxLength)
    ).toBeFalsy();
  });

  test("processed chunk contains the same words", () => {
    let maxLength = 20;

    let text = `this is a sentence. \
    this is another sentence and this one is longer then 20 characters.`

    let words = text.split(".").flatMap((val) => val.split(" "));
    let processedText = _private.processTTSText(text, maxLength);
    let processedTextJoined = processedText.join();

    expect(words.every((word) => processedTextJoined.includes(word)))
      .toBeTruthy();
  });
});

