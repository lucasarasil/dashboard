# Dashboard Operacional

Uma interface moderna e responsiva para gestão de serviços operacionais, construída com React e Tailwind CSS.

## 🚀 Características

- **Interface Moderna**: Design limpo e profissional com tema claro
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Tabela Principal**: Cards responsivos com informações dos serviços
- **Painel Lateral**: Drawer com detalhes completos do serviço selecionado
- **Sistema de Abas**: Histórico, Alertas, Logs e Mapa
- **Busca e Filtros**: Busca por placa, filial ou serviço com filtros rápidos
- **Indicadores Visuais**: Status coloridos, alertas e barras de progresso SLA
- **Animações Suaves**: Transições e hover effects

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização e design system
- **Heroicons** - Ícones modernos
- **Headless UI** - Componentes acessíveis

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd dashboard-operacional
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎨 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx                 # Cabeçalho com busca e filtros
│   ├── ServiceCard.jsx            # Card individual do serviço
│   ├── ServiceGrid.jsx            # Grid responsivo dos serviços
│   ├── ServiceDetailDrawer.jsx    # Painel lateral com detalhes
│   ├── ServiceDetailTabs.jsx      # Sistema de abas
│   ├── Modal.jsx                  # Modal base reutilizável
│   ├── ActionModal.jsx            # Modal para registrar ações
│   └── tabs/
│       ├── HistoryTab.jsx         # Aba do histórico
│       ├── AlertsTab.jsx          # Aba de alertas
│       ├── LogsTab.jsx            # Aba de logs de ação
│       └── MapTab.jsx             # Aba do mapa
├── App.js                         # Componente principal
├── index.js                       # Ponto de entrada
└── index.css                      # Estilos globais e Tailwind
```

## 🔧 Funcionalidades

### Header
- Título "Serviços em andamento"
- Barra de busca por placa, filial ou serviço
- Filtros rápidos (Todos, Aberto, Em andamento, Encerrado)
- Badge de contagem de alertas críticos

### Tabela Principal (Cards)
- Ordem (ID do serviço)
- Nome do serviço
- Status colorido (verde = concluído, amarelo = em andamento, vermelho = crítico)
- Placa do veículo
- Filial
- Motorista
- Indicadores visuais (alerta, revisão pendente, ação tomada)
- Barra de progresso SLA
- Hover state e clique para abrir detalhes

### Painel Lateral (Drawer)
- Campos principais no topo (ID, Status, Placa, Filial, Motorista)
- Sistema de abas:
  - **Histórico**: Timeline de eventos com horário e responsável
  - **Alertas**: Lista de alertas abertos e resolvidos
  - **Logs**: Auditoria de ações realizadas
  - **Mapa**: Mini mapa com localizações

### Extras
- Modal para registrar ações
- Animações suaves
- Indicadores de SLA
- Design responsivo

## 🎯 Status dos Serviços

- **Verde**: Concluído
- **Amarelo**: Em andamento
- **Vermelho**: Crítico

## 📱 Responsividade

O dashboard é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Grid adaptado
- **Mobile**: Cards empilhados verticalmente

## 🚀 Scripts Disponíveis

- `npm start` - Executa o app em modo de desenvolvimento
- `npm build` - Constrói o app para produção
- `npm test` - Executa os testes
- `npm eject` - Ejeta a configuração (irreversível)

## 📄 Licença

Este projeto está sob a licença MIT.



