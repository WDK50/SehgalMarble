import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="…">
      <div className="…">
        <div className="… gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
        …
      </div>
    </footer>
  );
}
