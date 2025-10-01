// src/components/PsicologaKettily.jsx
import React, { useState } from "react";
import logo from "../assets/KETTILY FORMIGA 6.png";
import foto1 from "../assets/kettilyformiga_b01.jpg";
import foto2 from "../assets/kettilyformiga_b08.jpg";
import "./PsicologaKettily.css";

const PsicologaKettily = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      pergunta: "Quais abordagens psicológicas você utiliza?",
      resposta:
        "Trabalho com abordagem cognitivo-comportamental, que busca compreender pensamentos, emoções e comportamentos."
    },
    {
      pergunta: "O atendimento pode ser online?",
      resposta:
        "Sim, realizo atendimentos presenciais e online, garantindo acolhimento em qualquer lugar."
    },
    {
      pergunta: "Qual a duração de uma sessão?",
      resposta: "Cada sessão dura em média 50 minutos."
    },
    {
      pergunta: "O atendimento é sigiloso?",
      resposta:
        "Sim, todo processo terapêutico segue o Código de Ética Profissional, assegurando sigilo e respeito."
    }
  ];

  return (
    <div className="site">
      <header className="header">
        <img src={logo} alt="Logo Kettily Formiga" />
        <h1>Psicóloga Kettily Formiga</h1>
      </header>

      <div className="banner" style={{ backgroundImage: `url(${foto2})` }} />

      <section className="sobre">
        <img src={foto1} alt="Kettily Formiga" />
        <div>
          <h2>Sobre Mim</h2>
          <p>
            Sou a psicóloga Kettily Formiga, dedicada a ajudar pessoas a
            encontrarem equilíbrio emocional e qualidade de vida. Atuo com
            empatia, acolhimento e técnicas baseadas em evidências científicas.
          </p>
        </div>
      </section>

      <section className="faq">
        <h2>Perguntas Frequentes</h2>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button onClick={() => toggleFAQ(index)}>{faq.pergunta}</button>
            {openIndex === index && <div>{faq.resposta}</div>}
          </div>
        ))}
      </section>

      <footer>
        <p>© 2025 Psicóloga Kettily Formiga | Todos os direitos reservados</p>
        <p>Contato: contato@kettilyformiga.com</p>
      </footer>

      {/* Botões flutuantes */}
      <div className="floating-buttons">
        <a
          href="https://wa.me/5583999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          WhatsApp
        </a>
        <a
          href="https://instagram.com/SEU_INSTAGRAM"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-btn"
        >
          Instagram
        </a>
      </div>
    </div>
  );
};

export default PsicologaKettily;
