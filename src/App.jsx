import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import { useLocalStorage } from './hooks/useLocalStorage';
import { RiLayout2Line } from 'react-icons/ri';
import { RiLayout4Line } from 'react-icons/ri';
import { RiLayoutBottomLine } from 'react-icons/ri';
import { RiLayoutTopLine } from 'react-icons/ri';
import SplitPane from 'react-split-pane';

const App = () => {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [layout, setLayout] = useState('top');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
    <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
    </html>
  `);
    }, 250);

    return () => {
      clearTimeout(timeOut);
    };
  }, [html, css, js]);

  return (
    <main>
      <SplitPane
        className={`${layout}`}
        split={`${
          layout === 'left' || layout === 'right' ? 'vertical' : 'horizontal'
        }`}
        style={{
          maxHeight: '97vh',
          width: '100vw',
        }}
        pane1Style={{ maxHeight: `${layout === 'top' ? '80%' : '100%'}` }}
        defaultSize={300}
        maxSize={-200}
        minSize={200}
      >
        <div className={`panel top-pane `}>
          <Editor
            language='xml'
            dispalyName='HTML'
            value={html}
            onChange={setHtml}
            layout={layout}
          />
          <Editor
            language='xml'
            dispalyName='CSS'
            value={css}
            onChange={setCss}
            layout={layout}
          />
          <Editor
            language='xml'
            dispalyName='JS'
            value={js}
            onChange={setJs}
            layout={layout}
          />
        </div>
        <div className={`panel bottom-pane `}>
          <iframe
            srcDoc={srcDoc}
            title='output'
            sandbox='allow-scripts'
            width='100%'
            height='100%'
          ></iframe>
        </div>
      </SplitPane>
      <div className='footer'>
        <button className='footer__iconBtn' onClick={() => setLayout('top')}>
          <RiLayoutTopLine />
        </button>
        <button className='footer__iconBtn' onClick={() => setLayout('bottom')}>
          <RiLayoutBottomLine />
        </button>
        <button className='footer__iconBtn' onClick={() => setLayout('right')}>
          <RiLayout2Line />
        </button>
        <button className='footer__iconBtn' onClick={() => setLayout('left')}>
          <RiLayout4Line />
        </button>
      </div>
    </main>
  );
};
export default App;
