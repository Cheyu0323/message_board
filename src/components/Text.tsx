import styled from "styled-components";

type TextProps = {
    size?: string,
    isWeight?: boolean,
    spacing?: string,
    lineHeight?: string,
}

const Text = styled.span<TextProps>`
    font-size: ${props => props.size ? props.size : "14px"};
    font-weight: ${props => props.isWeight ? "500" : "300"};
    letter-spacing: ${props => props.spacing ? props.spacing : "1.2px"};
    line-height: ${props => props.lineHeight ? props.lineHeight : "inherit"};
	white-space: pre-line;
`   


export default Text;