
import { useState, useEffect } from "react";

const PsicologaWebsite = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqItems = [
    { question: "Como funciona a primeira consulta?", answer: "A primeira consulta é um momento de acolhimento..." },
    { question: "Quanto tempo dura cada sessão?", answer: "Cada sessão tem duração de aproximadamente 50 minutos." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all ${isScrolled ? "bg-white shadow" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Dra. Kettily Formiga</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-blue-600">Início</a>
            <a href="#sobre" className="hover:text-blue-600">Sobre</a>
            <a href="#servicos" className="hover:text-blue-600">Serviços</a>
            <a href="#faq" className="hover:text-blue-600">Perguntas</a>
            <a href="#contato" className="hover:text-blue-600">Contato</a>
          </nav>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Agendar Consulta</button>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://placeholder-image-service.onrender.com/image/1920x1080?prompt=Serene%20therapy%20office')" }} />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Cuidando da Sua Mente</h1>
          <p className="text-xl md:text-2xl mb-8">Psicologia clínica com humanidade e excelência técnica</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Começar Agora</button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900">Saber Mais</button>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img src="https://placeholder-image-service.onrender.com/image/500x600?prompt=Professional%20female%20psychologist"
               alt="Psicóloga" className="rounded-lg shadow-xl w-full" />
          <div>
            <h2 className="text-4xl font-bold mb-6">Sobre a Dra. Kettily Formiga</h2>
            <p className="text-lg mb-6">Com mais de 10 anos de experiência em psicologia clínica...</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, i) => (
              <div key={i} className="mb-4">
                <button
                  onClick={() => setActiveTab(activeTab === i ? -1 : i)}
                  className="w-full text-left p-4 bg-white shadow rounded-lg flex justify-between items-center"
                >
                  {item.question}
                  <span>{activeTab === i ? "-" : "+"}</span>
                </button>
                {activeTab === i && <div className="p-4 bg-gray-50">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-12 text-center">
        <h4 className="text-2xl font-bold text-blue-600 mb-2">Dra. Kettily Formiga</h4>
        <p className="text-gray-600">Psicóloga Clínica dedicada ao seu bem-estar emocional.</p>
        <p className="mt-6 text-gray-500">&copy; 2024 Dra. Kettily Formiga. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default PsicologaWebsite;
