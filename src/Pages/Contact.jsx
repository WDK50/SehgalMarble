import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle
} from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-0">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 py-8 px-6">
        
        <form className="w-full flex flex-col space-y-4 animate-pulse">
          <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Name</span>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Email</span>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Message</span>
            <textarea
              rows="4"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </label>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>

        <div className="flex flex-col items-end justify-between w-full h-full">
          <div className="space-y-6 space-x-6 md:space-x-0">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span>123 Marble Ave, Stone City</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-600" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <span>info@marblesite.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-600 rotate-90" />
              <span>Fax: +1 (800) 765-4321</span>
            </div>
            <div className="flex flex-col items-start space-y-1">
              <span className="font-medium">Business Hours:</span>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>Mon–Fri:</span><span>9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>Sat:</span><span>10:00 AM – 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>Sun:</span><span>Closed</span>
              </div>
            </div>

          <div className="flex flex-col items-start ml-0 space-y-4">
            <a
              href="#live-chat"
              className="inline-flex items-start py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Live Chat Support
            </a>
          </div>
            <div className="flex space-x-4 mt-8">
              <a href="#" className="btn-primary p-2 rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="btn-primary p-2 rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="btn-primary p-2 rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="btn-primary p-2 rounded-full">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
