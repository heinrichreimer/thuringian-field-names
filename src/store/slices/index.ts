// Re-export to simplify importing.
export {
  featuredReducer,
  selectFeatured,
  selectFeaturedSnippets,
  selectFeaturedError,
  selectFeaturedIsLoading,
  fetchFeaturedFieldNames,
} from "./featured";
export type { FeaturedState } from "./featured";
export {
  searchReducer,
  selectSearch,
  selectSearchQuery,
  selectSearchResults,
  selectSearchError,
  selectSearchIsLoading,
  searchFieldNames,
} from "./search";
export type { SearchState } from "./search";
export {
  settingsReducer,
  selectSettings,
  selectSettingsLocale,
  updateLocale,
} from "./settings";
export type { SettingsState } from "./settings";
export {
  usersReducer,
  selectUsers,
  selectUsersActive,
  selectUsersError,
  selectUsersIsActive,
  selectUsersIsLoading,
  login,
  logout,
  register,
} from "./users";
export type { UserState } from "./users";
export {
  detailsReducer,
  selectDetails,
  selectDetailsFieldName,
  selectDetailsError,
  selectDetailsIsLoading,
  fetchFieldName,
} from "./details";
export type { DetailsState } from "./details";
