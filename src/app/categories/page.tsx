"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '../../lib/contentful';

// Define interfaces for Post and Category
interface Post {
  sys: { id: string };
  fields: { title: string; slug: string };
}

interface Category {
  sys: { id: string };
  fields: { name: string; posts: Post[] };
}

export default function Categories() {
  const [categories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        console.log('Fetched categories:', JSON.stringify(fetchedCategories, null, 2)); // Log the fetched categories structure

        // Check if fetchedCategories is an array
        if (!Array.isArray(fetchedCategories)) {
          throw new Error('Fetched categories is not an array');
        }


      } catch (err: unknown) {
        if (err instanceof Error)
          setError(`Failed to fetch categories: ${err.message}`);
        console.error('Error details:', err); // Log the error details
      }
    };

    getCategories();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>

      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.sys.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{category.fields.name}</h2>
            <p className="text-gray-600 mb-4">Explore our latest articles in the {category.fields.name} category.</p>
            <h3 className="text-xl font-semibold mb-2">Recent Posts:</h3>
            <ul className="list-disc list-inside space-y-2">
              {category.fields.posts.map((post) => (
                <li key={post.sys.id}>
                  <Link href={`/posts/${post.fields.slug}`} className="text-blue-600 hover:underline">
                    {post.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/categories/${category.fields.name.toLowerCase()}`} className="mt-4 inline-block text-blue-600 font-bold hover:underline">
              View all {category.fields.name} posts
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
