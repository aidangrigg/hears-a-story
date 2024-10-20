import { createContext, useState } from "react";

import { Story, StoryGenre, StoryLength } from "@/types/Story";
import * as Storage from "@/app/story/storage";

export interface LibraryContextProps {
  library: Story[];
  addStory: (title: string, genre: StoryGenre, length: StoryLength, allowAdultContent: boolean) => void;
  refresh: () => void;
}

export const LibraryContext = createContext<LibraryContextProps>({
  library: [],
  addStory: () => {},
  refresh: () => {},
});

export const LibraryProvider = ({ children }: any) => {
  const [library, updateLibrary] = useState<Story[]>([]);
  
  const addStory = (title: string, genre: StoryGenre, length: StoryLength, allowAdultContent: boolean) => {
    Storage.createStory(title, genre, length, allowAdultContent)
    refresh();
  };
  
  const refresh = () => {
    Storage.getAllStories().then((stories) => {
      updateLibrary(stories);
    });
  };
  
  return (
    <LibraryContext.Provider value={{ library, addStory, refresh }}>
      {children}
    </LibraryContext.Provider>
  );
}
