"use client"

import { fetchEntries } from '@/lib/contentful';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the type for a Document (rich text content)
interface Document {
  // data: { [k: string]: any }
  content: Array<{
    // data: { [k: string]: any }
    content: Array<{
      // data: {};
      marks: string[];
      value: string;
      nodeType: string;
    }>;
    nodeType: string;
  }>;
  nodeType: string;
}

// Define the type for a Post
interface Post {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    headline: Document; // Ensure the headline is typed as Document
    runway?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    publishDate?: string; // Add the publishDate field if it exists in your Contentful schema
    body?: string
  };
}

export default function BlogPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      console.log('Fetching all posts...');
      const fetchedPosts = await fetchEntries('Blog') as unknown as Post[]; // Updated to use the correct content type
      console.log('Fetched posts:', fetchedPosts); // Log the fetched posts
      if (fetchedPosts) {
        setPosts(fetchedPosts);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      {/* All Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => {
                const imageUrl = post.fields.runway?.fields?.file?.url ? `https:${post.fields.runway?.fields?.file?.url}` : '/placeholder-image.jpg';
                console.log('Image URL:', imageUrl); // Log the image URL
                console.log('Post Data:', post); // Log the entire post data for inspection
                return (
                  <div key={post.sys.id} className="bg-teal-700 shadow-md rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.fields.title}
                      width={400}
                      height={200}
                      className="w-full"
                      priority={true} // Add the priority property for images above the fold
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-green-100">{post.fields.title}</h3>
                      <p className="text-green-100 mb-4">
                        {post.fields.headline.content[0].content[0].value}
                      </p>
                      <Link href={`/posts/${post.sys.id}`} className="text-teal-200 font-bold hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
