import styled from "styled-components";
import COLORMAP from "./ColorMap";

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 90%;
    height: 95%;
    margin: auto;
    border-radius: 15px;
    background-color: ${COLORMAP.secondary};
    box-shadow: 1px 5px 10px ${COLORMAP.shadow};
    display: flex;
    flex-direction: column;
    max-width: 768px;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
        height: 90%;
	}
`;

export default Container;
