import { useState, useEffect } from "react";
import { useStoryblokApi } from "@storyblok/react";

export function useSiteContent() {
  const storyblokApi = useStoryblokApi();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!storyblokApi?.get) { setContent({}); return; }
    storyblokApi
      .get("cdn/stories/home", {
        version: import.meta.env.DEV ? "draft" : "published",
      })
      .then(({ data }) => setContent(data.story.content))
      .catch(() => setContent({}));
  }, [storyblokApi]);

  // get("hero", "sous_titre", fallback) → looks up "hero_sous_titre" on the story content
  const get = (section, key, fallback = "") => {
    const val = content?.[`${section}_${key}`];
    return val !== undefined && val !== "" ? val : fallback;
  };

  // getList("temoignages", fallback[]) → array field named "temoignages" on the story content
  const getList = (section, fallback = []) => {
    const val = content?.[section];
    return Array.isArray(val) && val.length > 0 ? val : fallback;
  };

  return { get, getList, loading: content === null };
}
