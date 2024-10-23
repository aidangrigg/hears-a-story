import { createContext, useState } from "react";

import { Story, StoryGenre, StoryLength } from "@/types/Story";
import * as Storage from "@/app/story/storage";

  export interface LibraryContextProps {
    library: Story[];
    addStory: (title: string, genre: StoryGenre, length: StoryLength, allowAdultContent: boolean) => void;
    removeStory: (key: string) => void;
    refresh: () => void;
  }

  export const LibraryContext = createContext<LibraryContextProps>({
    library: [],
    addStory: () => {},
    removeStory: () => {},
    refresh: () => {},
  });

export const LibraryProvider = ({ children }: any) => {
  const [library, updateLibrary] = useState<Story[]>([]);
  
    const addStory = (title: string, genre: StoryGenre, length: StoryLength, allowAdultContent: boolean) => {
      Storage.createStory(title, genre, length, allowAdultContent).then(() => refresh());
    };

    const refresh = () => {
      Storage.getAllStories().then((stories) => {
        updateLibrary(stories);
      });
    };

    const removeStory = (key: string) => {
      Storage.deleteStory(key).then(() => refresh());
    };

    return (
      <LibraryContext.Provider value={{ library, addStory, removeStory, refresh }}>
        {children}
      </LibraryContext.Provider>
    );
  }
