import styled from '@emotion/styled'
import colors from '../../lib/colors'

const CloseButton = styled('button')`
  background: transparent;
  border: none;
  color: ${colors.black};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: lighter;
  letter-spacing: 0.1em;
  margin: 0;
  position: absolute;
  text-transform: uppercase;
  top: 0.5rem;
  right: 0.5rem;
  ::after {
    content: '×';
    font-size: 115%;
    margin-left: 4px;
  }
`

export default CloseButton
