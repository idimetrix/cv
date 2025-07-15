import { HTMLAttributes, memo } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props extends HTMLAttributes<HTMLDivElement> {}

// Memoized MarkdownText component
export const MarkdownText = memo<Props>(({ children, className, ...rest }) => {
   return (
      <div className={className} {...rest}>
         {typeof children === 'string' ? (
            <ReactMarkdown
               components={{
                  p: ({ children }) => <span>{children}</span>,
                  strong: ({ children }) => <b>{children}</b>,
                  em: ({ children }) => <i>{children}</i>,
                  code: ({ children }) => (
                     <code className="bg-gray-100 px-1 rounded text-sm">
                        {children}
                     </code>
                  ),
                  a: ({ href, children }) => (
                     <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                     >
                        {children}
                     </a>
                  ),
                  ul: ({ children }) => (
                     <ul className="list-disc list-inside ml-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                     <ol className="list-decimal list-inside ml-4">
                        {children}
                     </ol>
                  ),
                  li: ({ children }) => <li>{children}</li>,
                  h1: ({ children }) => (
                     <h1 className="text-xl font-bold">{children}</h1>
                  ),
                  h2: ({ children }) => (
                     <h2 className="text-lg font-bold">{children}</h2>
                  ),
                  h3: ({ children }) => (
                     <h3 className="text-base font-bold">{children}</h3>
                  ),
                  h4: ({ children }) => (
                     <h4 className="font-bold">{children}</h4>
                  ),
                  h5: ({ children }) => (
                     <h5 className="font-bold">{children}</h5>
                  ),
                  h6: ({ children }) => (
                     <h6 className="font-bold">{children}</h6>
                  ),
               }}
            >
               {children}
            </ReactMarkdown>
         ) : (
            <>{children}</>
         )}
      </div>
   )
})

MarkdownText.displayName = 'MarkdownText'
