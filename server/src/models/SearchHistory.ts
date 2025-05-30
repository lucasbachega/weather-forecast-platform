import mongoose from "mongoose";

export interface ISearchHistory extends mongoose.Document {
  userId: string,
  query: string;
  searchedAt: Date;
}

const SearchHistorySchema = new mongoose.Schema<ISearchHistory>({
  userId: { type: String, required: true },
  query: { type: String, required: true, unique: true },
  searchedAt: { type: Date, required: true, expires: 259200 },
});

export const SearchHistory = mongoose.model<ISearchHistory>(
  "SearchHistory",
  SearchHistorySchema
);
