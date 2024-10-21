import { createContext, useState } from "react";

import { Story } from "@/types/Story";

  export interface LibraryContextProps {
    library: Story[];
    addStory: (newStory: Story) => void;
    removeStory: (key: number) => void;
  }

  export const LibraryContext = createContext<LibraryContextProps>({
    library: [],
    addStory: () => {},
    removeStory: () => {},
  });


  export const LibraryProvider = ({ children }: any) => {
    const [library, updateLibrary] = useState<Story[]>([
      {key: 0, title: "Story 1", status: "Ongoing", duration: "short", genre: "crime", allowAdultContent: false},
      {key: 1, title: "Story 2", status: "Ongoing", duration: "medium", genre: "crime", allowAdultContent: false},
      {key: 2,  title: "Story 3", status: "Ongoing", duration: "long", genre: "crime", allowAdultContent: false},
    ]);
  
    const addStory = (newStory: Story) => {
      updateLibrary([...library, newStory]);
    };

    const removeStory = (key: number) => {
      updateLibrary(library.filter(story => story.key !== key));
    };

    return (
      <LibraryContext.Provider value={{ library, addStory, removeStory }}>
        {children}
      </LibraryContext.Provider>
    );
  }