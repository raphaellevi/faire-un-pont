import { useState, useEffect } from "react";
import { useStoryblokApi, registerStoryblokBridge } from "@storyblok/react";

// Inside Storyblok's Visual Editor the URL carries ?_storyblok=<storyId>: show the draft there.
export const inStoryblokEditor =
  typeof window !== "undefined" && window.location.search.includes("_storyblok");
export const storyblokVersion = import.meta.env.DEV || inStoryblokEditor ? "draft" : "published";

// The home story is shared by every section: fetch it once and push live edits to all of them.
let homeContent = null;
let homeRequest = null;
const listeners = new Set();

function setHomeContent(content) {
  homeContent = content;
  listeners.forEach((listener) => listener(content));
}

function loadHome(storyblokApi) {
  if (homeRequest) return homeRequest;
  if (!storyblokApi?.get) {
    setHomeContent({});
    return (homeRequest = Promise.resolve());
  }
  homeRequest = storyblokApi
    .get("cdn/stories/home", { version: storyblokVersion })
    .then(({ data }) => {
      setHomeContent(data.story.content);
      // Live preview: each keystroke in the Visual Editor sends the updated story here.
      registerStoryblokBridge(data.story.id, (story) => setHomeContent(story.content));
    })
    .catch(() => setHomeContent({}));
  return homeRequest;
}

export function useSiteContent() {
  const storyblokApi = useStoryblokApi();
  const [content, setContent] = useState(homeContent);

  useEffect(() => {
    listeners.add(setContent);
    loadHome(storyblokApi);
    if (homeContent) setContent(homeContent);
    return () => listeners.delete(setContent);
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
