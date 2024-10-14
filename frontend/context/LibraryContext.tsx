import { createContext, useState } from "react";

import { Story } from "@/types/Story";

  export interface LibraryContextProps {
    library: Story[];
    addStory: (newStory: Story) => void;
  }

  export const LibraryContext = createContext<LibraryContextProps>({
    library: [],
    addStory: () => {},
  });


  export const LibraryProvider = ({ children }: any) => {
    const [library, updateLibrary] = useState<Story[]>([
      {key: 0, title: "Story 1", status: "Ongoing", duration: "2h 3m"},
      {key: 1, title: "Story 2", status: "Ongoing", duration: "2h 3m"},
      {key: 2,  title: "Story 3", status: "Ongoing", duration: "2h 3m"},
      {key: 3,  title: "The Hobbit", status: "Ongoing", duration: "2h 3m"}
    ]);
  
    const addStory = (newStory: Story) => {
      updateLibrary([...library, newStory]);
    };

    return (
      <LibraryContext.Provider value={{ library, addStory }}>
        {children}
      </LibraryContext.Provider>
    );
  }