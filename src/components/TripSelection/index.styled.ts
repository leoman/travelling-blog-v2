import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const FormWrapper = styled.div`
  display: flex;
`;

export const Label = styled.label`
  padding: 0.5rem 0.75rem;
  margin-bottom: 0px;
  font-size: 1rem;
  font-weight: normal;
  line-height: 2rem;
  color: rgb(70, 74, 76);
  text-align: center;
  background-color: rgb(236, 238, 239);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  border-right: none;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
`;

export const Select = styled.select`
  appearance: none;
  /*  safari  */
  -webkit-appearance: none;
  /*  other styles for aesthetics */
  font-size: 1rem;
  padding: 1rem 1rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  color: #000;
  cursor: pointer;
  transition: all 0.15s ease 0s;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
`;

export const SelectWrapper = styled.div`
  position: relative;

  &::before,
  &::after {
    --size: 0.3rem;
    content: "";
    position: absolute;
    right: 1rem;
    pointer-events: none;
  }

  &::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid black;
    top: 40%;
  }

  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid black;
    top: 55%;
  }
`;

