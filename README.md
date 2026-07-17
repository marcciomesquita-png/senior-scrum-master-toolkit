# senior-scrum-master-toolkit

Ferramentas práticas que construí e uso no dia a dia como Scrum Master / Agile Coach.

Não são exercícios de estudo: cada item nasceu de um problema real de time — planejamento de capacidade e decisão de viabilidade financeira — em um ambiente **não-TI** (indústria gráfica atuando em licitação pública), onde o Scrum precisa conversar com prazo, custo e stakeholder externo.

---

## 1. Sprint Capacity Calculator

Arquivo: [`sprint_capacity_calculator.tsx`](./sprint_capacity_calculator.tsx) — componente React

**Problema:** o time se compromete com um volume de sprint baseado em percepção, não em capacidade real. Feriados, férias e ausências somem da conta — e o comprometimento estoura.

**O que faz:** calcula a capacidade da sprint em horas. Conta os dias úteis entre a data de início e a de fim, descartando fins de semana e os feriados cadastrados; multiplica pelas horas por dia e pelo tamanho do time; e desconta os dias de férias e de ausência previstos para cada integrante. Os feriados nacionais brasileiros de 2026 são reconhecidos pelo nome.

**Uso na prática:** na Sprint Planning, antes de puxar itens do backlog. Muda a discussão de "acho que dá" para "temos X horas disponíveis".

---

## 2. Planilha de custo exequível (licitação pública)

Arquivo: [`PLANILHA_CUSTO_EXEQUIVEL_artefato.xlsx`](./PLANILHA_CUSTO_EXEQUIVEL_artefato.xlsx)

**Problema:** em licitação pública, um preço mal calculado ou desclassifica a proposta por inexequibilidade, ou vence um contrato que dá prejuízo. A decisão precisa acontecer com prazo curto e informação dispersa.

**O que faz:** estrutura a composição de custos e testa a viabilidade do preço antes do envio da proposta, tornando explícita a margem e o ponto em que a operação deixa de fechar.

**Uso na prática:** apoio à decisão de participar ou não do certame — e, quando se participa, com que preço.

---

## Sobre

Scrum Master sênior e Agile Coach, São Paulo/SP. Mais de 5 anos aplicando Scrum fora do contexto de TI, com forte interface com stakeholders externos, prazo regulatório e restrição de custo. Interesse de longa data em governança (ITIL) somada à prática ágil.

Outras ferramentas do portfólio serão adicionadas a este repositório ao longo do tempo.
