# Ouvido Musical

Ferramenta de treinamento auditivo musical que ajuda a confiar no próprio ouvido.

## Visão geral

Este projeto é uma pequena aplicação web para praticar percepção musical por meio de acordes. A ideia é simples: ouvir um acorde, identificar sua sonoridade e responder corretamente em poucos segundos.

## Como funciona

- Escolha um nível de dificuldade
- Clique em "Tocar acorde"
- Escute com atenção
- Identifique o tipo de acorde
- Acumule pontos e aumente a sequência de acertos

## Níveis disponíveis

### Básico
- Maior
- Menor

### Intermediário
- Maior
- Menor
- Sétima
- Diminuta

### Avançado
- Maior
- Menor
- Sétima
- Diminuta
- Maior com 7
- Sus2
- Sus4

## Objetivo

Mais do que mostrar notas: é desenvolver confiança auditiva. A música já está em você.

## Como executar localmente

1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` no navegador
3. Se preferir, use um servidor local:

```bash
python -m http.server 8000
```

Depois acessa:

```bash
http://localhost:8000
```

## Publicação no GitHub Pages

Este projeto já foi pensado para funcionar como página estática no GitHub Pages.

### Passos

1. Vá até o repositório no GitHub
2. Abra `Settings` → `Pages`
3. Em source, selecione a branch principal (`main`)
4. Use a pasta raiz (`/root`)
5. Salve e aguarde a publicação

O site ficará disponível em algo como:

```text
https://cris-print.github.io/ouvido-musical/
```

## Tecnologias usadas

- HTML
- CSS
- JavaScript
- Web Audio API

## Melhorias futuras

- Mais exercícios de identificação auditiva
- Sistema de progresso por sessão
- Históricos de acertos e erros
- Layout mais visual e responsivo
- Ranking local com armazenamento em navegador
- Módulo de continuações harmônicas

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Descrição curta para o repositório

Treinamento auditivo musical com exercícios de identificação de acordes em navegador.
