import styled from 'styled-components';
import Titulo from './src/components/Title';
import { Container } from './style';
import Form from './src/components/Form';
import Footer from './src/app/footer';  // Importando o Footer do arquivo separado

export default function App() {
  return (
    <Container>
      <Footer />  
    </Container>
  );
}

// Estilos adicionais (se necessário)
const StyledContainer = styled(Container)`
  flex: 1;  // Faz o container ocupar toda a altura da tela
  justify-content: space-between; // Distribui espaço entre o título, o formulário e o footer
`;
