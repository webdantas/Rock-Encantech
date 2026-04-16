# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2026-04-15

### Adicionado
- **Arquitetura Backend**: Implementação dos padrões Service e Repository Pattern no Laravel.
- **Autenticação**: Integração completa com Laravel Sanctum.
- **Frontend Core**: Dashboard de produtos com Material UI.
- **Navegação**: Roteamento dinâmico com `react-router-dom`.
- **Automação de Testes**: Suite de testes para Backend (PHPUnit) e Frontend (Vitest).
- **Containerização**: Orquestração completa via Docker e Docker Compose.
- **CI/CD**: Configuração de GitHub Actions para automação de testes em cada push.

### Corrigido
- Ajuste na paginação de produtos no repositório.
- Correção de interceptadores de erro no Axios.
- Uniformização estética da grade de produtos (Grid UI).
- **CI/CD**: Sincronização de versões do PHP (8.4) e Node.js (20) para compatibilidade com dependências modernas.
- **QA**: Implementação de verificação de Lint (ESLint) e Build de produção integrados ao pipeline de Integração Contínua.

## [0.1.0] - 2026-04-10
- Inicialização do projeto Laravel e React.
- Configuração básica do Banco de Dados.
