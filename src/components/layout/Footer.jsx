const Footer = () => {
  return (
    <footer className="mt-12 border-t bg-white/60 dark:bg-gray-900/60 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Made by Dev Nayak.
      </div>
    </footer>
  );
};
export default Footer;
