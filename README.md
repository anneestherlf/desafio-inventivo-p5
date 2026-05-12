# Comparação de Limite de Crédito Concedido
**Banco PAN: Time de Política de Crédito**

<img align="center" src="/assets/prototipo.png">

## 1. Introdução à Proposta

O Banco PAN opera com um modelo não-linear para definição de limite de crédito e atua em constante evolução e iteração desse modelo para melhor atender os clientes. Por esse motivo, convidou alunos de graduação para um projeto com o objetivo de desenvolver um algoritmo de modelo linear para realizar uma comparação de resultados.

- **Modelo Não-Linear**: utiliza uma função objetivo com variáveis e parâmetros não-lineares para estimar o limite ideal de concessão.
- **Modelo Linear**: aplica uma relação linear entre as variáveis de entrada e o limite de crédito concedido.

O **time de política de crédito** precisa monitorar periodicamente se esses dois modelos estão produzindo resultados convergentes ou divergentes. Quando a diferença entre os valores é:

| Classificação | Significado | Ação Recomendada |
|---|---|---|
| 🟢 **Baixa** (≤ 20) | Modelos alinhados | Monitoramento de rotina |
| 🟡 **Média** (21–40) | Divergência moderada | Revisão dos parâmetros |
| 🔴 **Alta** (> 40) | Discrepância crítica | Revisão urgente da função objetivo e variáveis |

### 1.1 Solução Desenvolvida

Uma interface interativa em **p5.js** que permite ao analista de crédito:
1. Inserir o limite médio gerado pelo Modelo Não-Linear;
2. Inserir o limite médio gerado pelo Modelo Linear;
3. Clicar em **Comparar** para visualizar graficamente a diferença;
4. Interpretar a divergência através de um indicador cromático automático.

## 2. Rascunhos Iniciais

### 2.1. Rascunho físico

<img align="center" src="/assets/fisico-comparacao.jpg">

De início pensei em utilizar círculos, mas acabei mudando para um gráfico de barras após um feedback direto da professora Bruna (UX Design). O motivoi foi que gráficos de barras representam a diferença entre os valores de forma perceptível ao olho humano (diferente dos círculos). Fonte: <https://scc.ms.unimelb.edu.au/resources/data-visualisation-and-exploration/no_pie-charts>


### 2.2. Rascunho no Figma

<img align="center" src="/assets/figma-comparacao.png">

## 3. Resultado final (utilizando p5.js)

Acesse aqui: <https://anneestherlf.github.io/desafio-inventivo-p5/>

<img align="center" width="80rem" src="https://ecoarte.info/wp-content/uploads/2017/01/p5image.png">
