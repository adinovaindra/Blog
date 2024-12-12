
import { fetchEntry } from '../../../lib/contentful';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FeaturedPost } from '@/app/page';

// Define the type for a Post

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {

  // const [post, setPost] = useState<Post | null>(null);
  // useEffect(() => {

  // }, [params]);

  // if (!post) {
  //   return <div>Loading...</div>;
  // }


  const post = await fetchEntry((await params).id) as unknown as FeaturedPost
  if (!post) return <>not found</>
  const imageUrl = post.fields.runway?.fields?.file?.url ? `https:${post.fields.runway?.fields?.file?.url}` : '/placeholder-image.jpg';

  console.log('Post data:', post.fields); // Add this line to log the post data

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Link href="/blogpost" className="text-green-100 font-bold hover:underline mb-4 block">
            Back to Blog
          </Link>
          <h2 className="text-3xl font-bold mb-8">{post.fields.title}</h2>
          <Image
            src={imageUrl}
            alt={post.fields.title}
            width={1600}
            height={800}
            className="w-full mb-8"
            priority={true} // Add the priority property for images above the fold
          />
          <p className="text-teal-100 mb-8">{post.fields.Headline}</p>
          {
          documentToReactComponents(post.fields.body)}
          {/* <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.fields.body || '' }} /> */}
          <p className="text-teal-100 mt-8">Published on: {post.fields.publishDate}</p>
        </div>
      </section>
    </div>
  );
}
