import { Highlight, Language, themes } from 'prism-react-renderer';

const CodeBlock = ({
    code,
    language,
  }: {
    code: string;
    language: Language;
  }) => (
    <div className='overflow-hidden'>
        <Highlight code={code} language={language} theme={themes.vsDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} rounded-lg p-4 overflow-auto select-none`} style={style}>
            {tokens.map((line, i) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { key, ...restLineProps } = getLineProps({ line, key: i });
                return (
                <div key={i} {...restLineProps}>
                    {line.map((token, j) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { key: tokenKey, ...restTokenProps } = getTokenProps({ token });
                    return <span key={j} {...restTokenProps} />;
                    })}
                </div>
                );
            })}
            </pre>
        )}
        </Highlight>
    </div>
  );
  

export default CodeBlock;