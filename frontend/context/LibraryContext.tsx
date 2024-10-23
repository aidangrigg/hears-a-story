import { createContext, useState } from "react";

import { Story, StoryGenre, StoryLength } from "@/types/Story";
import * as Storage from "@/app/story/storage";

  export interface LibraryContextProps {
    library: Story[];
    addStory: (newStory: Story) => void;
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
  
    const addStory = (newStory: Story) => {
      updateLibrary([...library, newStory]);
      refresh();
    };

    const refresh = () => {
      Storage.getAllStories().then((stories) => {
        updateLibrary(stories);
      });
    };

    const removeStory = (key: string) => {
      updateLibrary(library.filter(story => story.id !== key));
    };

    return (
      <LibraryContext.Provider value={{ library, addStory, removeStory, refresh }}>
        {children}
      </LibraryContext.Provider>
    );
  }
