/* eslint-disable prettier/prettier */
import { api } from "@/lib/api";

export type SubmitReviewPayload = {
  name: string;
  role?: string;
  rating: number;
  review: string;
};

export const submitReview = async (
  data: SubmitReviewPayload,
) => {
  const response = await api.post(
    "/feedback/review",
    data,
  );

  return response.data;
};

export const getApprovedReviews = async () => {
  const response = await api.get(
    "/feedback/reviews",
  );

  return response.data;
};