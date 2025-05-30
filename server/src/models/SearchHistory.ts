import mongoose from "mongoose";

export interface ISearchHistory extends mongoose.Document {
  userId: string;
  query: string;
  searchedAt: Date;
}

const SearchHistorySchema = new mongoose.Schema<ISearchHistory>({
  userId: { type: String, required: true },
  query: { type: String, required: true },
  searchedAt: { type: Date, required: true, expires: 259200 },
});

SearchHistorySchema.index({ userId: 1, query: 1 }, { unique: true });

export const SearchHistory = mongoose.model<ISearchHistory>(
  "SearchHistory",
  SearchHistorySchema
);
