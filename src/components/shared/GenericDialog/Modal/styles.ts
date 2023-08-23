import styled from 'styled-components';
import Button from 'components/ui-elements/Button';

interface ModalBodyHolderProps {
  modalWidth?: string;
  overflowHidden?: boolean;
  modalPadding?: string;
  transparent?: boolean;
  bottomOffset: number;
  modalPosition: 'top' | 'center';
}

export const BREAKPOINTS: {
  mobile: number;
} = {
  mobile: 576,
};

export const ModalBodyHolder = styled.div<ModalBodyHolderProps>`
  position: absolute;
  top: calc(15vh - ${props => props.bottomOffset}px);
  left: 50%;
  transform: translate(-50%, 0);
  max-height: 90vh;
  max-width: 95%;
  box-sizing: border-box;
  //background: #fff;
  min-width: 40rem;
  border-radius: 3px;
  //box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
  outline: none;
  overflow: auto;
  ${props => Boolean(props.modalWidth) && `min-width: ${props.modalWidth};`}
  ${props => props.overflowHidden && 'overflow: hidden;'}
  padding: 1.5rem;
  ${props => props.modalPadding !== undefined && `padding: ${props.modalPadding};`}
  ${props => props.modalPosition === 'center' && `top: 50%; transform: translate(-50%, -50%);`}
  
  ${props =>
    props.transparent &&
    `
    background: transparent;
    box-shadow: none;
  `}
  
  @media screen and (max-width: ${BREAKPOINTS.mobile}px) {
    min-width: 95%;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem;
`;
