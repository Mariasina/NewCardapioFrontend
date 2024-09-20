import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
`;

export const MarcellusFont = styled('p')`
    font-family: 'Marcellus', serif;
`;
