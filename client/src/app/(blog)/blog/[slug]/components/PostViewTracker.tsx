'use client';

import { useEffect } from 'react';
import { incrementPostView } from '@/app/lib/api';

const VIEWED_POSTS_STORAGE_KEY = 'beomlog:viewed-posts';
const VIEW_TTL_MS = 24 * 60 * 60 * 1000;

type ViewedPosts = Record<string, number>;

const getViewedPosts = (): ViewedPosts => {
  try {
    const storedValue = window.localStorage.getItem(VIEWED_POSTS_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : {};
  } catch {
    return {};
  }
};

const PostViewTracker = ({ postId }: { postId: number }) => {
  useEffect(() => {
    const viewedPosts = getViewedPosts();
    const lastViewedAt = viewedPosts[postId];
    const now = Date.now();

    if (lastViewedAt && now - lastViewedAt < VIEW_TTL_MS) {
      return;
    }

    window.localStorage.setItem(
      VIEWED_POSTS_STORAGE_KEY,
      JSON.stringify({
        ...viewedPosts,
        [postId]: now,
      })
    );

    const recordView = async () => {
      const result = await incrementPostView(postId);

      if (result) return;

      const latestViewedPosts = getViewedPosts();
      delete latestViewedPosts[postId];
      window.localStorage.setItem(
        VIEWED_POSTS_STORAGE_KEY,
        JSON.stringify(latestViewedPosts)
      );
    };

    recordView();
  }, [postId]);

  return null;
};

export default PostViewTracker;
