import React, { useState, useEffect } from "react";

function InstagramEmbed({ url }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch(`https://api.instagram.com/oembed/?url=${url}`)
      .then((response) => response.json())
      .then((data) => setHtml(data.html));
  }, [url]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default InstagramEmbed;