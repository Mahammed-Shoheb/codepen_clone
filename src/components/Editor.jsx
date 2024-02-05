import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { useState } from 'react';
import { LuPanelLeftClose } from 'react-icons/lu';
import { LuPanelRightClose } from 'react-icons/lu';
import { LuPanelTopClose } from 'react-icons/lu';
import { LuPanelBottomClose } from 'react-icons/lu';

const Editor = (props) => {
  const { dispalyName, language, value, onChange, layout } = props;

  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    // editor.autoRefresh();
    onChange(value);
  }
  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className='editor-title'>
        {dispalyName}
        <button
          onClick={() => setOpen((prev) => !prev)}
          type='button'
          className='icon'
        >
          {open ? (
            layout === 'left' || layout == 'right' ? (
              <LuPanelTopClose />
            ) : (
              <LuPanelLeftClose />
            )
          ) : layout === 'left' || layout == 'right' ? (
            <LuPanelBottomClose />
          ) : (
            <LuPanelRightClose />
          )}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        autoScroll
        scroll={true}
        className='code-mirror-wrapper'
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
          scrollbarStyle: null,
        }}
      />
    </div>
  );
};
export default Editor;
