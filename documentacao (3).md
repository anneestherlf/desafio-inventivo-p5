
# Documentação do Projeto: Comparador de Modelos de Crédito

## 1. Introdução à Proposta
Este projeto visa fornecer uma ferramenta visual para comparação de limites de crédito concedidos por dois modelos distintos: um modelo tradicional **Linear** e um modelo moderno **Não-Linear**. A proposta foca em melhorar a percepção da diferença de magnitude entre os valores, substituindo representações circulares (áreas) por barras horizontais (comprimentos), seguindo boas práticas de visualização de dados.

## 2. Rascunhos Iniciais
Inicialmente, a interface utilizava círculos para representar os valores de crédito. Contudo, a comparação de áreas é cognitivamente mais difícil e imprecisa para o usuário.
- **Problema identificado:** Círculos distorcem a percepção da diferença (se o raio dobra, a área quadruplica).
- **Solução proposta:** Utilização de um gráfico de barras horizontais com base comum e destaque para a "barra de ganho" (Diferença), facilitando a leitura imediata.
- **Interface:** Layout limpo em estilo 'card', com inputs claros e seletor de mês funcional.

## 3. Registro do Resultado Obtido
O resultado final é uma aplicação web funcional utilizando a biblioteca **p5.js**.
- **Visualização:** Gráfico de barras triplas que mostra o valor absoluto do Modelo Linear e o desempenho superior do Modelo Não-Linear.
- **Interatividade:** O usuário pode inserir valores manuais e observar a atualização dinâmica do gráfico e do cálculo da diferença média.
- **Estética:** Design inspirado em interfaces modernas de Dashboard Financeiro, com paleta de cores sóbria (Azul Marinho, Cinza e Dourado).
