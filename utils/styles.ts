import styled from 'styled-components'
import { Theme } from '../utils/types'

export const PrimaryButton = styled.button(
  (props: Theme) => `
  cursor: pointer;
  border: 1px solid #fff;
  width: auto;
  padding: 5px 15px;
  background-color: ${props.primaryBackground};
  border-radius: 6px;
  text-decoration: none;
`
)

export const SecondaryButton = styled(PrimaryButton)`
  cursor: pointer;
  border: 1px solid #2f3031;
`
