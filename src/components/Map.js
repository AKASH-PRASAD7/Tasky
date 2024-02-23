const Map = () => {
  let location = {
    malta:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.0951918940436!2d14.489252174513279!3d35.846669320870326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5a8552b04a6d%3A0xd6a6624d89d784a!2sMalta%20International%20Airport!5e0!3m2!1sen!2sin!4v1708611805757!5m2!1sen!2sin",
    dublin:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.36595709244!2d-6.410513763860923!3d53.324411630120316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sin!4v1708612168868!5m2!1sen!2sin",
    newyork:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d774440.7005443521!2d-75.16236524321295!3d40.69249604091181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1708612367879!5m2!1sen!2sin",
  };
  return (
    <>
      <main className="h-full ">
        <iframe
          src={location.newyork}
          width="280"
          height="300"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </main>
    </>
  );
};

export default Map;
