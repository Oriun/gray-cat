import React from 'react'
import './design-guidelines.css'

type SwitchProps = {
    value: boolean;
    onChange: (b: boolean) => void 
}

const Switch = ({ value, onChange }: SwitchProps) => {
    return (
        <div className={"guideline-switch " + (value ? 'on' : 'off')} onClick={() => onChange(!value)}>
            <div />
        </div >
    )
}

const DesignGuidelines = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const params = new URLSearchParams(window.location.search)
    const [visible, setV] = React.useState(true)
    const [movable, setM] = React.useState(false);
    const [activated, setA] = React.useState(true);
    const [position, setP] = React.useState(JSON.parse(localStorage.guidelines || null) || {
      top: 20,
      left: window.screen.width - 200,
    });
    React.useEffect(()=>{
      if(visible) return
      const show = ()=>setV(true)
      window.addEventListener('mousedown', show, { once: true })
      return () => window.removeEventListener('mousedown', show)
    },[visible])
    React.useEffect(()=>{
      localStorage.setItem('guidelines', JSON.stringify(position))
    },[position])
    React.useEffect(() => {
      function move(e: MouseEvent) {
        setP({
          top: e.clientY - 10,
          left: e.clientX - 10,
        });
      }
      if (movable) window.addEventListener("mousemove", move);
      if (!ref.current) {
        if (movable) return () => window.removeEventListener("mousemove", move);
        else return;
      }
      ref.current.addEventListener(
        "mouseup",
        () => {
          setM(false);
        },
        { once: true }
      );
      ref.current.addEventListener(
        "mousedown",
        () => {
          setM(true);
        },
        { once: true }
      );
      if (movable) return () => window.removeEventListener("mousemove", move);
    }, [movable]);
  
    if (params.has("guidelines"))
      return (
        <>
          <div
            ref={ref}
            className="guidelines"
            style={{
              position: "fixed",
              ...position,
              zIndex: 1_000_000,
              backgroundColor: "white",
              padding: 8,
              borderRadius: 5,
              boxShadow: "0px 0px 5px rgba(0,0,0,.5)",
              userSelect: 'none',
              ...(!visible ? { display: 'none' } : {})
            }}
            onDoubleClick={()=>setV(false)}
          >
            Guidelines <Switch value={activated} onChange={setA} />
          </div>
          {activated && (
            <style>
              {"*:not(.guidelines, .guidelines *) { outline: 1px solid red; }"}
            </style>
          )}
        </>
      );
    else return <></>;
  };

export default DesignGuidelines