import styled from "styled-components";
import { injectGlobal } from "styled-components";

const FlexLayout = styled.div`
	display: grid;
	width: 60vw;
	grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Title = styled.h1`
	font-size: 1.5em;
	color: ${props => (props.standard ? "white" : "green")};
`;


injectGlobal`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: purple;
  }
`;




const AppLayout = styled.section`
	color: blue;
	display: flex;
	align-items: center;
	flex-direction: column;
`;


export {
	FlexLayout,
	Title,
	AppLayout
}