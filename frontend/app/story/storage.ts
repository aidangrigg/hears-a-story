import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StoryResponseType {
  NARRATOR,
  USER
}

type StoryResponse = {
  response_id: string;
  type: StoryResponseType;
  text: string;
}

type MemoryStreamFragment = {
  response_id: string;
  observation: string;
  location: string;
}

export enum StoryGenre {
  CRIME,
  SCIFI,
  FANTASY,
  MYSTERY,
}

export enum StoryLength {
  SHORT,
  MEDIUM,
  LONG
}

// id is encoded into key name
type Story = {
  id: string;
  dateCreated: Date;
  genre: StoryGenre;
  length: StoryLength;
  responses: StoryResponse[];
  memoryStream: MemoryStreamFragment[];
}

const CURRENT_STORY_KEY = "current_story";

function storyKey(id: string): string {
  return `story:${id}`;
}

/**
 * Gets the story with the passed in id.
 * If a story with the passed in id does not exist, returns null.
 */
export async function getStory(id: string): Promise<Story | null> {
  let storyString = await AsyncStorage.getItem(storyKey(id));

  if (storyString === null) {
    return null;
  } else {
    return JSON.parse(storyString);
  }
}

/**
 * Gets all the currently stored stories.
 */
export async function getAllStories(): Promise<Story[]> {
  let keys = await AsyncStorage.getAllKeys();

  let storyKeys = keys.filter((key) => key.startsWith("story:"));
  let storyStrings = await AsyncStorage.multiGet(storyKeys);

  return storyStrings.reduce<Story[]>((arr, [_, storyString]) => {
    if (storyString !== null) {
      let story = JSON.parse(storyString);
      arr.push(story);
    }
    return arr
  }, []);
}

/**
 * Creates a new story based on passed in parameters. If isCurrent is true, updates the current story
 * to the newly created story.
 * Returns the created story.
 */
export async function createStory(genre: StoryGenre, length: StoryLength, isCurrent = true): Promise<string> {
  let story: Story = {
    id: crypto.randomUUID(),
    dateCreated: new Date(),
    genre: genre,
    length: length,
    responses: [],
    memoryStream: []
  };

  await AsyncStorage.setItem(storyKey(story.id), JSON.stringify(story));

  if (isCurrent) {
    await setCurrentStoryId(story.id);
  }

  return story.id;
}

async function setStory(id: string, story: Story) {
  await AsyncStorage.setItem(storyKey(id), JSON.stringify(story));
}

export async function addMemoryStreamFragment(response_id: string, observation: string, location: string) {
  let maybeCurrentStory = await getCurrentStory();

  if (maybeCurrentStory === null) {
    console.error("[storage::addMemoryStreamFragment] Tried to add to non-existent story's memory stream!");
    return;
  }

  let story = maybeCurrentStory;

  story.memoryStream.push({ response_id, observation, location });
  setStory(story.id, story);
}

export async function addStoryResponse(type: StoryResponseType, text: string) {
  let maybeCurrentStory = await getCurrentStory();

  if (maybeCurrentStory === null) {
    console.error("[storage::addStoryResponse] Tried to add a response to a non-existance story!");
    return;
  }

  let story = maybeCurrentStory;
  let response = { response_id: crypto.randomUUID(), type, text };

  story.responses.push(response);
  setStory(story.id, story);

  return response.response_id;
}

async function getCurrentStoryId(): Promise<string | null> {
  return await AsyncStorage.getItem(CURRENT_STORY_KEY);
}

export async function getCurrentStory(): Promise<Story | null> {
  let id = await getCurrentStoryId();

  if (id === null) {
    return null;
  }

  let maybeStory = await getStory(id);

  if (maybeStory === null) {
    return null;
  }

  return maybeStory;
}

export async function setCurrentStoryId(id: string) {
  await AsyncStorage.setItem(CURRENT_STORY_KEY, id);
}
