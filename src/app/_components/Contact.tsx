import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaGoodreads,
} from "react-icons/fa";

const ContactMe = () => {
  return (
    <section className="bg-gray-700 py-8 text-white">
      <div className="container mx-auto text-center">
        {/* Contact Text */}
        <h2 className="mb-4 border-b border-white/50 pb-4 text-center text-4xl font-bold">
          Contact / Learn More
        </h2>
        <p className="mt-4 italic">
          "There are no strangers here; Only friends you haven't met yet."
          -William Butler Yeats
        </p>
        {/* Icons */}
        <div className="mt-4 flex justify-center space-x-8">
          <a
            href="mailto:charliehaviland@gmail.com"
            className="text-3xl hover:text-gray-400"
          >
            <FaEnvelope className="h-16 w-16" />
          </a>
          <a
            href="https://linkedin.com/in/charlie-haviland"
            className="text-3xl hover:text-gray-400"
          >
            <FaLinkedin className="h-16 w-16" />
          </a>
          <a
            href="https://github.com/Chaviland7"
            className="text-3xl hover:text-gray-400"
          >
            <FaGithub className="h-16 w-16" />
          </a>
          <a
            href="https://www.goodreads.com/user/show/74756247-charlie-haviland"
            className="text-3xl hover:text-gray-400"
          >
            <FaGoodreads className="h-16 w-16" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
