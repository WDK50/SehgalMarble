// src/pages/About.jsx
import React from "react";
import Team1 from "/assets/Team/Profile.jpg";
// import Team2 from "../assets/team/sara-iqbal.jpg";
// import Team3 from "../assets/team/omar-sheikh.jpg";
const About = () => {
  const heroImg =
    "https://img.freepik.com/free-photo/colorful-vertical-slabs-marble_53876-74705.jpg?t=st=1745992930~exp=1745996530~hmac=700d58a6363b7a254ca448c705b68989475dac9dde38cd3525df8d495e59ccf8&w=1800";
  const storyImg =
    "https://img.freepik.com/free-photo/view-hands-engaged-it-yourself-project_23-2151509486.jpg?t=st=1745993692~exp=1745997292~hmac=9e7b1918cc2dc3c62b870931e4cecccb4f13ee873b144820c9a14b06041403eb&w=826";
  const values = [
    {
      icon: "https://img.freepik.com/free-vector/premium-quality-product-golden-label-design_1017-12393.jpg?uid=R186966907&ga=GA1.1.1967409058.1739293360&semt=ais_hybrid&w=740",
      title: "Quality First",
      desc: "We source only the finest marble.",
    },
    {
      icon: "https://img.freepik.com/free-vector/leaves-arrows-cycle_78370-5532.jpg?uid=R186966907&ga=GA1.1.1967409058.1739293360&semt=ais_hybrid&w=740",
      title: "Sustainability",
      desc: "Ethical and eco‑friendly practices.",
    },
    {
      icon: "https://img.freepik.com/free-vector/elements-about-blacksmithing_1284-790.jpg?uid=R186966907&ga=GA1.1.1967409058.1739293360&semt=ais_hybrid&w=740",
      title: "Craftsmanship",
      desc: "Meticulous care in every cut and finish.",
    },
  ];
  const team = [
    {
      img: Team1,
      name: "Ali Khan",
      role: "Founder & CEO",
    },
    {
      img: Team1,
      name: "Sara Iqbal",
      role: "Head of Design",
    },
    {
      img: Team1,
      name: "Omar Sheikh",
      role: "Operations Manager",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="group relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Marble craftsmanship"
          className="absolute inset-0 w-full h-full object-cover hover:cursor-pointer opacity-100 group-hover:opacity-30 transition-opacity duration-300"
        />
        <div className="relative text-center text-black px-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            About MarbleLux
          </h1>
          <p className="max-w-2xl mx-auto text-lg drop-shadow-md">
            Crafting timeless elegance from nature’s finest marble—our story is
            built on passion, quality, and heritage.
          </p>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src={storyImg}
            alt="Marble quarrying process"
            className="w-full h-80 object-cover rounded-lg shadow-lg hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out"
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
            Every slab tells a story—of earth, craftsmanship, and timeless
            design. We invite you to explore our heritage and bring a piece of
            it into your space.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 border rounded-lg hover:shadow-lg transition"
              >
                <img src={v.icon} alt={v.title} className="mx-auto h-40 w-40 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600 text-lg">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Meet the Team
        </h2>
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
