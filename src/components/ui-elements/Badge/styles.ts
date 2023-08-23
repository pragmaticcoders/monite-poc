import styled from 'styled-components';

export const BadgeContainer = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #857f7f;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;

  ${props => props.color && `background-color: ${props.color};`}
`;
