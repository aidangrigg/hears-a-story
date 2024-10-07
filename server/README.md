# Hear's a Story Server

## Setup

```bash
npm install
```

## Run dev server

```bash
npm run dev
```

## Run

```bash
npm run start
```

## Endpoints

### POST /api/tts

Generate a TTS voice output based on text input.

#### Body

```json
{
	"text": "<tts text input here>"
}
```

#### Returns

WAV formatted audio containing the text to speech response.

#### Example

```bash
curl --header "Content-Type: application/json" \
     --request POST \
	 --data '{"text":"Hello, world!"}' \
	 http://localhost:3000/api/tts --output test.wav
```
