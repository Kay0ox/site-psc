import { useState, useEffect } from 'react';

const PsicologaWebsite = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      question: "Como funciona a primeira consulta?",
      answer: "A primeira consulta é um momento de acolhimento onde conhecemos sua história, entendemos suas necessidades e definimos juntos o plano de tratamento mais adequado para você."
    },
    {
      question: "Quanto tempo dura cada sessão?",
      answer: "Cada sessão tem duração de aproximadamente 50 minutos, tempo ideal para um trabalho terapêutico eficaz."
    },
    {
      question: "Com que frequência devo fazer terapia?",
      answer: "Geralmente recomendamos sessões semanais, especialmente no início do tratamento. A frequência pode ser ajustada conforme a evolução do processo terapêutico."
    },
    {
      question: "A terapia é confidencial?",
      answer: "Sim, todo o conteúdo das sessões é protegido pelo sigilo profissional, conforme estabelece o código de ética da psicologia."
    }
  ];

  const services = [
    {
      title: "Terapia Individual",
      description: "Atendimento personalizado para adultos que buscam autoconhecimento e desenvolvimento pessoal."
    },
    {
      title: "Terapia de Casal",
      description: "Trabalho focado no relacionamento, comunicação e resolução de conflitos conjugais."
    },
    {
      title: "Orientação Profissional",
      description: "Auxílio na escolha e planejamento de carreira e desenvolvimento profissional."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header com navegação */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">Dra. Ana Silva</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="hover:text-primary transition-colors">Início</a>
              <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
              <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
              <a href="#faq" className="hover:text-primary transition-colors">Perguntas</a>
              <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
            </nav>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Agendar Consulta
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section com Parallax */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{backgroundImage: "url('https://placeholder-image-service.onrender.com/image/1920x1080?prompt=Serene%20therapy%20office%20with%20comfortable%20chair,%20plants,%20and%20soft%20lighting&id=hero-bg-001')"}}
            
          
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Cuidando da Sua Mente</h1>
          <p className="text-xl md:text-2xl mb-8">Psicologia clínica com humanidade e excelência técnica</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
              Começar Agora
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-foreground transition-colors">
              Saber Mais
            </button>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://placeholder-image-service.onrender.com/image/500x600?prompt=Professional%20female%20psychologist%20smiling%20warmly%20in%20clinical%20setting&id=about-001" 
                alt="Psicóloga profissional em ambiente clínico aconchegante"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Sobre a Dra. Ana Silva</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Com mais de 10 anos de experiência em psicologia clínica, me dedico a oferecer um 
                atendimento humanizado e baseado em evidências científicas. Minha abordagem combina 
                técnicas da terapia cognitivo-comportamental com uma escuta empática e acolhedora.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Formada pela Universidade de São Paulo com especialização em Terapia Cognitivo-Comportamental, 
                acredito que cada pessoa possui recursos internos para superar desafios e alcançar bem-estar.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-muted-foreground">Pacientes Atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-muted-foreground">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Serviços Oferecidos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos diferentes modalidades de atendimento para atender às suas necessidades específicas
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card text-card-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <button className="mt-6 text-primary hover:text-primary/80 transition-colors font-semibold">
                  Saiba mais →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre terapia e atendimento psicológico
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-6">
                <button
                  onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                  className="w-full text-left p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <svg 
                      className={`w-5 h-5 transform transition-transform ${activeTab === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {activeTab === index && (
                  <div className="p-6 bg-muted/50 rounded-b-lg">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Entre em Contato</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Estou aqui para ajudar você a dar o primeiro passo em direção ao bem-estar emocional.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg">(11) 99999-9999</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg">contato@dranasilva.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-primary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome completo</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Como posso ajudar você?"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4">Dra. Ana Silva</div>
              <p className="text-muted-foreground">
                Psicóloga Clínica dedicada ao seu bem-estar emocional e desenvolvimento pessoal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Terapia Individual</li>
                <li>Terapia de Casal</li>
                <li>Orientacao Profissional</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>(11) 99999-9999</li>
                <li>contato@dranasilva.com</li>
                <li>Av. Paulista, 1000 - SP</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-primary hover:text-primary/80">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.859 7.75c.205 1.724-.538 3.157-1.262 4.098-.731.949-1.732 1.792-2.917 1.855-1.185.063-1.672-.73-2.794-.73-1.123 0-1.632.73-2.794.714-1.161-.016-2.141-.921-2.872-1.869-1.565-2.127-1.726-6.126.739-8.084.938-.892 2.195-1.367 3.282-1.367 1.087 0 2.178.471 3.014.471.836 0 1.879-.471 3.173-.471 1.025 0 2.24.405 3.178 1.248-2.785 1.533-2.376 5.135-.537 6.655z"/>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Dra. Ana Silva. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PsicologaWebsite;
