import { create } from 'zustand';

interface ChatSearchState {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

// Selecting a chat from search results navigates to a different `chatId`,
// which remounts MessagesPage (and its `useState`) under the App Router.
// Keeping the search query here instead lets it survive that remount.
export const useChatSearchStore = create<ChatSearchState>((set) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
