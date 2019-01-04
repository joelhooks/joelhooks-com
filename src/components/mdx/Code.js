import React from 'react';
import { get, last } from 'lodash';
import theme from 'prism-react-renderer/themes/oceanicNext';
import Highlight, { defaultProps } from 'prism-react-renderer';

export default props => {
  const language = last(
    get(props, 'className', 'language-text').split('-'),
  );
  return (
    <Highlight
      {...defaultProps}
      code={props.children}
      language={language}
      theme={theme}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
