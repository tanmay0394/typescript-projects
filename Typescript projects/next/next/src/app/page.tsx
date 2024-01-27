"use client";

import React, { useEffect } from "react";
import AddPost from "../../components/AddPost";
import Post from "../../components/Post";

const API_URL: string = "https://jsonplaceholder.typicode.com/posts";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPostList(data);
    }

    fetchData();
  }, []);

  const [postList, setPostList] = React.useState<IPost[]>([]);

  const addPost = async (e: React.FormEvent, formData: IPost) => {
    e.preventDefault();
    const post: IPost = {
      id: Math.random(),
      title: formData.title,
      body: formData.body,
    };
    setPostList([post, ...postList]);
  };

  const deletePost = async (id: number) => {
    const posts: IPost[] = postList.filter((post: IPost) => post.id !== id);
    setPostList(posts);
  };

  if (!postList) return <h1>Loading...</h1>;

  return (
    <main className="container">
      <h1>My posts</h1>
      <AddPost savePost={addPost} />
      {postList.map((post: IPost) => (
        <Post key={post.id} deletePost={deletePost} post={post} />
      ))}
    </main>
  );
}
