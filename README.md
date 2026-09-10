# Evx Consultoria — Aplicação Web Institucional Premium

Aplicação web completa, moderna, de alta performance e padrão agência internacional desenvolvida exclusivamente para a **Evx Consultoria**.

---

## 💎 Características Principais

1. **Direção Visual de Alto Nível:**
   - Estética minimalista, sofisticada e tecnológica inspirada nas grandes consultorias globais (McKinsey, Bain, Accenture Interactive) e agências digitais contemporâneas.
   - Tipografia impactante com `Plus Jakarta Sans` e `Inter`.
   - Alto contraste: superfícies escuras profundas (`#0A0E17`), branco puro e acento em **Azul Safira Tecnológico** (`#2563EB`).
   - Uso oficial do logotipo fornecido pelo usuário com tratamento otimizado para temas claros e escuros.

2. **Seções e Componentes Desenvolvidos:**
   - **Header Fixo:** Navegação suave, glassmorphism sutil ao rolar a página, logotipo em alta definição e menu mobile responsivo.
   - **Hero Section:** Composição assimétrica marcante com headline maciça, CTAs de conversão, trust bar com líderes acelerados e arte 3D/isométrica com cartões flutuantes de métricas (+187% Leads, +42% Conversão, +R$ 1,2M gerados).
   - **O Problema:** 4 cartões de identificação de gargalos (Falta de estratégia, Baixa conversão, Processos ineficientes, Crescimento limitado).
   - **Soluções Estratégicas:** 6 cartões interativos (Estratégia, Marketing, Tecnologia, Processos, Vendas, Dados) com microinterações e descrições aprofundadas.
   - **Diferencial (Consultoria Tradicional vs Nosso Método):** Comparativo direto ressaltando nosso compromisso com execução e lucro real.
   - **Como Trabalhamos:** Timeline visual com 4 etapas conectadas (Diagnóstico, Estratégia, Execução, Otimização).
   - **Cases / Resultados:** Cards editoriais com fotos de alta qualidade, métricas destacadas e botão interativo *"Ver case completo"* que abre um modal com detalhamento de problema, solução e resultados auditados.
   - **Números / Métricas:** Grid de contadores numéricos com animação fluida acionada via `IntersectionObserver`.
   - **Sobre Nós:** Layout dividido com fotografia corporativa e manifesto da empresa.
   - **Depoimentos:** Cartões de recomendação executiva com foto, cargo, empresa e avaliação 5 estrelas (com suporte a carrossel touch no mobile).
   - **CTA Final:** Bloco escuro imersivo para agendamento de diagnóstico confidencial.
   - **Modal de Diagnóstico / Agendamento:** `<dialog>` acessível nativo para captação de leads com seletor de desafios e integração com WhatsApp.
   - **Footer Completo:** Colunas organizadas, links rápidos, dados de contato e links legais.
   - **Botão Flutuante de WhatsApp:** Acesso imediato no canto inferior direito com indicador de atendente online.

---

## 🚀 Como Executar Localmente

### Opção 1: Abrir diretamente no Navegador
Basta dar um duplo clique no arquivo `index.html` ou abri-lo com o Google Chrome, Microsoft Edge ou qualquer navegador moderno.

### Opção 2: Servidor Local
No terminal da pasta do projeto:
```bash
npx serve . -p 3000
```
Em seguida, acesse no navegador: `http://localhost:3000`.

---

## 📁 Estrutura de Arquivos

```
EvxConsultoria/
├── index.html                 # Estrutura semântica completa e meta tags SEO/OG
├── package.json               # Configurações e scripts
├── README.md                  # Documentação do projeto
├── assets/
│   ├── images/
│   │   ├── logo-evx.png       # Logotipo original fornecido
│   │   ├── logo-evx-white.png # Logotipo invertido para fundos escuros
│   │   └── hero-visual.svg    # Obra geométrica tecnológica 3D
├── css/
│   ├── variables.css          # Cores, tipografia, espaçamentos e tokens
│   ├── base.css               # Reset, tipografia e containers
│   ├── components.css         # Header, botões, modais, badges e whatsapp
│   ├── sections.css           # Estilização de cada uma das seções
│   └── responsive.css         # Breakpoints Mobile, Tablet e Desktop 1440px+
└── js/
    ├── data/
    │   ├── services.js        # Conteúdo editável das soluções
    │   ├── cases.js           # Conteúdo editável dos cases de sucesso
    │   ├── metrics.js         # Conteúdo editável das métricas
    │   └── testimonials.js    # Conteúdo editável dos depoimentos
    ├── modules/
    │   ├── header.js          # Glassmorphism e menu mobile
    │   ├── counters.js        # Animação de contagem numérica
    │   ├── caseModal.js       # Modal interativo de cases
    │   ├── leadModal.js       # Modal de diagnóstico e captura de leads
    │   ├── carousel.js        # Carrossel swipe para mobile
    │   └── animations.js      # Scroll reveal e microinterações
    └── main.js                # Inicializador de todos os módulos
```

---

## 🛠️ Como Editar o Conteúdo
Todos os dados de serviços, cases, números e depoimentos estão centralizados na pasta `js/data/`. Para alterar um case ou adicionar uma métrica, basta editar o respectivo arquivo `.js` sem precisar mexer na estrutura complexa do código.
