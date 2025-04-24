import React from 'react';
import { useState } from 'react';

export default function PostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [image, setImage] = useState(initialData.image || '');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content, image });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded p-2"
      />
      <textarea
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Submit
      </button>
    </form>
  );
}
