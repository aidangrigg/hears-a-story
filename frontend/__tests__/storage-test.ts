import * as Storage from '../app/story/storage';
import { StoryGenre, StoryLength, StoryResponseType } from '../app/story/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe("Storage tests", () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  
  it("can create a story", async () => {
    let id = await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);
    let story = await Storage.getStory(id);

    expect(story?.genre).toBe(StoryGenre.CRIME);
    expect(story?.length).toBe(StoryLength.SHORT);
  });

  it("can fetch a specific story", async () => {
    let id1 = await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);
    let id2 = await Storage.createStory(StoryGenre.FANTASY, StoryLength.MEDIUM);

    let story1 = await Storage.getStory(id1);
    let story2 = await Storage.getStory(id2);

    expect(story1?.genre).toBe(StoryGenre.CRIME);
    expect(story1?.length).toBe(StoryLength.SHORT);
    
    expect(story2?.genre).toBe(StoryGenre.FANTASY);
    expect(story2?.length).toBe(StoryLength.MEDIUM);
  });

  it("can get all stories", async () => {
    await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);
    await Storage.createStory(StoryGenre.FANTASY, StoryLength.MEDIUM);

    let stories = await Storage.getAllStories();

    expect(stories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          genre: StoryGenre.CRIME,
          length: StoryLength.SHORT,
	  dateCreated: expect.any(String),
	  responses: [],
          memoryStream: [],
        }),
	expect.objectContaining({
          genre: StoryGenre.FANTASY,
          length: StoryLength.MEDIUM,
	  dateCreated: expect.any(String),
	  responses: [],
          memoryStream: [],
        })
      ])
    );

    expect(stories.length).toBe(2);
  });

  it("should be able to get current the story", async () => {
    let id = await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);

    let currentStory = await Storage.getCurrentStory();
    let story = await Storage.getStory(id);

    expect(currentStory).toEqual(story);
  });

  it("should be able to change the current story", async () => {
    let id1 = await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);
    let id2 = await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);

    let currentStory = await Storage.getCurrentStory();
    let story1 = await Storage.getStory(id1);
    let story2 = await Storage.getStory(id2);

    expect(currentStory).toEqual(story2);
    
    await Storage.setCurrentStory(id1);
    currentStory = await Storage.getCurrentStory();

    expect(currentStory).toEqual(story1);
  });

  it("should be able to add to the memory stream of the current story", async () => {
    await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);

    await Storage.addMemoryStreamFragment("1",
      "Sitting in a booth at a dimly lit diner, awaiting the crew for the heist.",
      "Diner");

    let story = await Storage.getCurrentStory();
    
    expect(story).toEqual(expect.objectContaining({
      genre: StoryGenre.CRIME,
      length: StoryLength.SHORT,
      responses: [],
      memoryStream: expect.arrayContaining([
	expect.objectContaining({
	  response_id: "1",
	  observation: "Sitting in a booth at a dimly lit diner, awaiting the crew for the heist.",
	  location: "Diner"
	})
      ]),
    }));
  });

  it("should be able to add a new user response", async () => {
    await Storage.createStory(StoryGenre.CRIME, StoryLength.SHORT);

    let response_id = await Storage.addStoryResponse(StoryResponseType.USER, "Do something cool");

    let story = await Storage.getCurrentStory();
    
    expect(story).toEqual(expect.objectContaining({
      genre: StoryGenre.CRIME,
      length: StoryLength.SHORT,
      responses: expect.arrayContaining([
	expect.objectContaining({
	  response_id,
	  type: StoryResponseType.USER,
	  text: "Do something cool"
	})
      ]),
      memoryStream: []
    }));
  });

});
