export enum StoryResponseType {
  NARRATOR,
  USER
}

export enum Emotions {
    HAPPY = 'Happy',
    SAD = 'Sad',
    ANGRY = 'Angry',
    IMPRESSED = 'Impressed',
    ANXIOUS = 'Anxious',
    CONFIDENT = 'Confident',
    GUILTY = 'Guilty',
    SURPRISED = 'Surprised',
    ANNOYED = 'Annoyed',
    SCARED = 'Scared'
}

export interface StoryResponse {
  response_id: string;
  type: StoryResponseType;
  text: string;
}

export interface MemoryStreamFragment {
  response_id: string;
  observation: string;
  location: string;
}

export enum StoryGenre {
  CRIME = "crime",
  SCIFI = "sci-fi",
  FANTASY = "fantasy",
  MYSTERY = "mystery",
}

export enum StoryLength {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long"
}

export interface Story {
  id: string;
  title: string;
  allowAdultContent: boolean;
  dateCreated: Date;
  genre: StoryGenre;
  length: StoryLength;
  responses: StoryResponse[];
  memoryStream: MemoryStreamFragment[];
  milestoneIndex: number;
  promptsSinceLastMilestone: number;
  isFinished: boolean;
  emotionStream: Emotions[]
}

