import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export function useSiteContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent.list().then(items => {
      const map = {};
      items.forEach(item => {
        if (!map[item.section]) map[item.section] = {};
        map[item.section][item.key] = item.value;
      });
      setContent(map);
      setLoading(false);
    });
  }, []);

  const get = (section, key, fallback = "") => {
    return content?.[section]?.[key] ?? fallback;
  };

  return { get, loading };
}