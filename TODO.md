## Em andamento

## Pendente

- Obter a matriz vetorial (SVG/PDF) do logo e uma versão simplificada do monograma para favicon e nav pequena (o manual v1.0 só traz PNG; os ícones atuais são recortes raster).
- Confirmar a razão social para usar como `legalName` no JSON-LD e no rodapé (hoje só consta o nome fantasia + CNPJ).
- Conferir no navegador (desktop e celular) a home e a página `projetos/index.html` (cards sem as etiquetas de stack): card do Loteamento Inteligente em largura total e a ordem das seções (destaque no topo).
- Decidir se o Loteamento Inteligente é produto próprio e, se for, ajustar o título da seção "Produto em destaque".

## Feito

- 2026-11-18: site despersonalizado do Caio, tudo como equipe: removidos e-mail Gmail, LinkedIn e GitHub pessoais (botões, rodapé, JSON-LD), faixa de estatísticas (baseada no currículo dele), bio individual e o Person do JSON-LD; os três aparecem como cofundadores. Pendente: o WhatsApp (91 98047-1449) continua como único contato — confirmar se é número da empresa; sem e-mail no site até existir um da empresa.

- 2026-11-18: Pedro Winicius da Silva Brito adicionado à seção Sobre (`img/pedro.jpeg`, mesmo efeito P&B + luz vermelha); equipe em 3 colunas. Cargo: "Desenvolvedor, gestor de tráfego e cofundador". Pendente: conferir o layout no navegador e se ele autoriza foto e nome no site (a camisa mostra o logo de outra empresa, "Dreams").

- 2026-11-18: foto do Igor trocada pela versão em P&B com luz vermelha (`img/igor.jpeg`, recorte do print) e o mesmo efeito aplicado à foto do Caio (`img/maia.jpeg`, gerado por script: recorte automático + P&B + luz vermelha, original preservado fora do repo). Removido o `filter: grayscale` de `.about-photo img` (anularia o vermelho). Pendente: conferir no navegador; se quiser acabamento igual ao da IA da foto do Igor, refazer a do Caio na mesma ferramenta.

- 2026-11-16: removida a localidade Belém-PA da home (título, metas, JSON-LD, hero, Sobre, FAQ). Mantida a "Belém e Castanhal" do card Dra. Lenita Brasil (unidades do cliente, home e projetos). Pendente: decidir se mantém.

- 2026-11-16: seção Sobre com equipe: Caio Maia Almeida (Engenheiro de Software e fundador) e Igor Soares Marinho (Desenvolvedor e cofundador), foto do Igor recortada em `img/igor.jpeg`. Pendente: conferir no navegador (desktop e celular) e confirmar se o Igor autoriza a foto e o nome no site.

- 2026-11-16: chat de demonstração de IA removido do hero e mantido como seção própria (`#assistente-ia`, entre Serviços e Projetos); hero em coluna única. Decidir se a seção fica, muda de lugar ou sai da página.

- 2026-11-07: identidade da MAIA DEVELOPMENT (manual de marca v1.0) aplicada: paleta preto/cinza/vermelho, Open Sans, logo e monograma, favicon, OG image, JSON-LD de Organization com CNPJ, textos em nome da empresa, rodapé com CNPJ; removidos hero-bg, halos e ruído.
- 2026-11-04: `projetos/index.html` separada em Produto em destaque (Loteamento Inteligente), Sistemas e Landing pages.
- 2026-11-04: card de destaque do Loteamento Inteligente também na seção Projetos de `index.html`.
- 2026-11-04: removidos Sistemas da home e de projetos; landing pages adicionadas à home; `js/site.js` protegido contra elementos ausentes.
- 2026-11-04: removidas as etiquetas de stack (`.pills`) dos cards de projeto em `index.html` e `projetos/index.html`, e o CSS `.pills` de `css/site.css`.
- 2026-11-04: removido o carrossel de clientes (`.clients`/`.marquee-*`) da home.
- 2026-11-05: título da seção de landing pages trocado para "Seis landing pages desenvolvidas." (sem afirmar que estão no ar) em `index.html` e `projetos/index.html`.
