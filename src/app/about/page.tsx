import Image from 'next/image';
import Dino from './../../../public/profileoke.png';
import Michelle from './../../../public/woman.jpg';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-center">About Our Blog</h1> {/* Centered title */}

      {/* Blog History */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-teal-100">Our Story</h2>
        <p className="text-gray-300 mb-4">
          {`Founded in 2020, our blog started as a passion project to share interesting insights and stories about various topics.
          Over the years, we've grown into a community of writers and readers who are curious about the world around us.`}
        </p>
      </section>

      {/* Author Bios */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-teal-100">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-teal-800 shadow-md rounded-lg p-6 flex items-center space-x-4">
            <Image src={Dino} alt="Adinova Indra Permana" width={80} height={80} className="rounded-full" />
            <div>
              <h3 className="text-xl font-bold text-teal-100">Adinova Indra Permana</h3>
              <p className="text-gray-300">Founder & Aviation Enthusiast</p>
            </div>
          </div>
          <div className="bg-teal-800 shadow-md rounded-lg p-6 flex items-center space-x-4">
            <Image src={Michelle} alt="Michelle" width={100} height={100} className="rounded-full" />
            <div>
              <h3 className="text-xl font-bold text-teal-100">Michelle Natasya</h3>
              <p className="text-gray-300">Senior Writer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-teal-100">Our Mission</h2>
        <p className="text-teal-200 mb-4">
          We strive to provide high-quality, engaging content that informs, entertains, and inspires our readers.
          Our goal is to create a platform where ideas can be shared and discussions can flourish.
        </p>
      </section>

      {/* Contact Information */}
      <section className="p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4 text-teal-100">Get in Touch</h2>
        <p className="text-gray-300 mb-4">
          {`We'd love to hear from you! Reach out to us on social media or drop us an email.`}
        </p>
        <div className="socmed flex space-x-4">
          <a href="https://x.com/adinovaindra" className="flex items-center text-gray-800 hover:underline">
            <Image src="/x.jpg" alt="Twitter" width={60} height={60} className="mr-1" />
            Twitter
          </a>
          <a href="https://youtube.com/@AdinovaIndraPermana" className="flex items-center text-gray-800 hover:underline">
            <Image src="/youtube.jpg" alt="YouTube" width={70} height={70} className="mr-1" />
            YouTube
          </a>
          <a href="mailto:adinovapramono@yahoo.co.id" className="flex items-center text-gray-800 hover:underline">
            <Image src="/gmail.jpg" alt="Email" width={35} height={35} className="mr-1" />
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
