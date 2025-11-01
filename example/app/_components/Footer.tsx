export default function Footer() {
  return (
    <footer className="section py-10 text-sm text-white/60">
      <div className="border-t border-white/10 pt-6">
        © {new Date().getFullYear()} @moondev/next-wow — MIT. Animate.css v4 included.
      </div>
    </footer>
  );
}
