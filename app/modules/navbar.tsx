const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-md shadow-md">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#home" className="text-xl font-bold text-blue-400">
            MyPortfolio
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-200">
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
