"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchEntries } from '../lib/contentful'
import { Document } from '@contentful/rich-text-types';

// Define the structure of the featured post
export interface FeaturedPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    Headline: string;
    runway?: {
      fields?: {
        file?: {
          url: string;
        };
      };
    };
    publishDate?: string; // Ensure publishDate is a string
    body:Document
  };
}

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);

  useEffect(() => {
    const getFeaturedPosts = async () => {
      console.log('Fetching featured posts...');
      const posts = await fetchEntries('Blog'); // Updated to use the correct content type
      console.log('Fetched posts:', posts); // Log the fetched posts
      if (posts) {
        // Sort posts by publish date (assuming 'publishDate' is the field name)
        const sortedPosts = posts.sort((a, b) => {
          const dateA = new Date((a.fields.publishDate || '1970-01-01') as string).getTime();
          const dateB = new Date((b.fields.publishDate || '1970-01-01') as string).getTime();
          return dateB - dateA;
        });
        // Limit to the last 3 posts
        const featuredPosts = sortedPosts.slice(0, 3);
        setFeaturedPosts(featuredPosts as unknown as FeaturedPost[]);
      }
    };

    getFeaturedPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop>
          <source src="/bannerFHD.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="container mx-auto h-full flex flex-col items-center justify-center px-4 relative z-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to Go - Blog ✈️</h1>
          <p className="text-xl mb-8">Soaring High: Your Gateway to the World of Aviation</p>
          <Link href="https://www.youtube.com/watch?v=t0GrpAgdBFI" className="button px-6 py-2 rounded-full font-bold transition-all">
            Listen to Live ATC from Las Vegas!
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.length <= 3 ? (
              featuredPosts.map((post) => {
                const imageUrl = post.fields.runway?.fields?.file?.url ? "https:" + post.fields.runway?.fields?.file?.url : '/placeholder-image.jpg';
                console.log('Image URL:', imageUrl); 
                console.log('Post Data:', post); 
                return (
                  <div key={post.sys.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.fields.title}
                      width={400}
                      height={200}
                      className="w-full"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{post.fields.title}</h3>
                      <p className="text-gray-600 mb-4">{post.fields.Headline}</p>
                      <Link href={`/posts/${post.sys.id}`} className="text-emerald-900 font-bold hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No featured posts available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="popular py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Dine & Watch !</h2>
          <h3 className="text-xl font-bold mb-8 text-teal-100">Enjoy Meals with Entertaining Videos !</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<Link href='https://www.youtube.com/watch?v=L24Wf0VlTE0&t=7s' className="bg-green-100 p-4 rounded-lg shadow-md text-center text-xl font-semibold hover:shadow-lg transition-shadow">How a &apos;small&apos; engine lifts 100 people and cargo?</Link>
<Link href='https://www.youtube.com/watch?v=zU_aHdhkZBU' className="bg-green-100 p-4 rounded-lg shadow-md text-center text-xl font-semibold hover:shadow-lg transition-shadow">It’s sunny outside, yet you hit turbulence?&rsquo;</Link>
          <Link href='https://www.youtube.com/watch?v=x3uD5MwhA5w' className="bg-green-100 p-4 rounded-lg shadow-md text-center text-xl font-semibold hover:shadow-lg transition-shadow">Can a pilot have tattoos and smoke?</Link>
<Link href='https://www.youtube.com/watch?v=Y3HnPQ-KmL0' className="bg-green-100 p-4 rounded-lg shadow-md text-center text-xl font-semibold hover:shadow-lg transition-shadow">Plane vs. birds : <br /> Who wins?&rsquo;</Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="calmgreen bg-gray-100 text-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Subscribe to our newsletter for the latest posts and updates</p>
          <Link href="mailto:go@blog.com" className="button px-8 py-3 rounded-full font-bold transition-all">
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  )
}
