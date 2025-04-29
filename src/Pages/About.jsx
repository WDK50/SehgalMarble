 // src/pages/About.jsx
import React from 'react';

const About = () => {
  // Demo image URLs
  const heroImg       = 'https://via.placeholder.com/1200x600?text=Marble+Craftsmanship';
  const storyImg      = 'https://via.placeholder.com/600x400?text=Our+Journey';
  const values = [
    {
      icon: 'https://via.placeholder.com/64?text=Q',
      title: 'Quality First',
      desc: 'We source only the finest marble.'
    },
    {
      icon: 'https://via.placeholder.com/64?text=S',
      title: 'Sustainability',
      desc: 'Ethical and eco‑friendly practices.'
    },
    {
      icon: 'https://via.placeholder.com/64?text=C',
      title: 'Craftsmanship',
      desc: 'Meticulous care in every cut and finish.'
    }
  ];
  const team = [
    {
      img: 'https://via.placeholder.com/160?text=Ali+Khan',
      name: 'Ali Khan',
      role: 'Founder & CEO'
    },
    {
      img: 'https://via.placeholder.com/160?text=Sara+Iqbal',
      name: 'Sara Iqbal',
      role: 'Head of Design'
    },
    {
      img: 'https://via.placeholder.com/160?text=Omar+Sheikh',
      name: 'Omar Sheikh',
      role: 'Operations Manager'
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="relative h-[50vh] flex items-center justify-center bg-gray-200 overflow-hidden">
        <img
          src={heroImg}
          alt="Marble craftsmanship"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About MarbleLux
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            Crafting timeless elegance from nature’s finest marble—our story is
            built on passion, quality, and heritage.
          </p>
        </div>
      </section>

      {/* 2. Our Journey */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src={storyImg}
            alt="Marble quarrying process"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold">Our Journey</h2>
          <p>
            Founded in 1995, MarbleLux began as a small family‑owned quarry in
            the heart of Pakistan’s marble belt. Over 25 years, we’ve grown into
            a trusted supplier of premium marble, serving architects and
            designers worldwide.
          </p>
          <p>
            Every slab tells a story—of earth, craftsmanship, and timeless design.
            We invite you to explore our heritage and bring a piece of it into
            your space.
          </p>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-6 border rounded-lg hover:shadow-lg transition">
                <img src={v.icon} alt={v.title} className="mx-auto h-16 mb-4" />
                <h3 className="text-xl font-medium mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Meet the Team */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
