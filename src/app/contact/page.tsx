export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Contact Us
        </h1>
        <p className="text-lg text-center mb-12">
          Reach out to us with your queries. We&apos;re here to help!
        </p>

        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Visit Us
          </h2>
          <p className="text-lg mb-2">Dadeldhura District, Mauroda</p>
          <p className="text-lg mb-2">
            <a href="tel:9848626549" className="text-blue-600 hover:underline">
              Phone: 9848626549
            </a>
          </p>
          <p className="text-lg">
            <a
              href="mailto:ghatalelectricals@gmail.com"
              className="text-blue-600 hover:underline"
            >
              Email: ghatalelectricals@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
