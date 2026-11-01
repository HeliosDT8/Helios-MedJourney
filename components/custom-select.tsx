"use client";

import {createPortal} from "react-dom";
import {useCallback,useEffect,useId,useLayoutEffect,useMemo,useRef,useState} from "react";

export type SelectOption = string | {value:string;label:string;disabled?:boolean};
type Props={id?:string;name:string;label:string;options:SelectOption[];required?:boolean;disabled?:boolean;placeholder?:string;value?:string;defaultValue?:string;onValueChange?:(value:string)=>void;invalid?:boolean};
type Position={top:number;left:number;width:number;maxHeight:number};

export function validateCustomSelects(form:HTMLFormElement){
  const triggers=Array.from(form.querySelectorAll<HTMLButtonElement>(".custom-select-trigger[aria-required='true']"));
  let firstInvalid:HTMLButtonElement|undefined;
  for(const trigger of triggers){
    const value=trigger.parentElement?.querySelector<HTMLInputElement>(".custom-select-value")?.value||"";
    if(!value){trigger.setAttribute("aria-invalid","true");firstInvalid??=trigger;}else trigger.removeAttribute("aria-invalid");
  }
  firstInvalid?.focus();
  return !firstInvalid;
}

export function CustomSelect({id,name,label,options,required=false,disabled=false,placeholder="Select an option",value,defaultValue="",onValueChange,invalid=false}:Props){
  const generatedId=useId().replace(/:/g,"");
  const controlId=id||`select-${generatedId}`;
  const listboxId=`${controlId}-listbox`;
  const rootRef=useRef<HTMLDivElement>(null);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const optionRefs=useRef<Array<HTMLDivElement|null>>([]);
  const controlled=value!==undefined;
  const [uncontrolledValue,setUncontrolledValue]=useState(defaultValue);
  const selectedValue=controlled?value:uncontrolledValue;
  const [open,setOpen]=useState(false);
  const [activeIndex,setActiveIndex]=useState(-1);
  const [position,setPosition]=useState<Position>();
  const [typeahead,setTypeahead]=useState("");
  const typeaheadTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const normalizedOptions=useMemo(()=>options.map(option=>typeof option==="string"?{value:option,label:option,disabled:false}:option),[options]);
  const selected=normalizedOptions.find(option=>option.value===selectedValue);

  const updatePosition=useCallback(()=>{
    const rect=triggerRef.current?.getBoundingClientRect();
    if(!rect)return;
    const margin=8, gap=6, below=window.innerHeight-rect.bottom-margin-gap, above=rect.top-margin-gap;
    const openAbove=below<Math.min(240,above)&&above>below;
    const maxHeight=Math.max(80,Math.min(300,openAbove?above:below));
    setPosition({top:openAbove?Math.max(margin,rect.top-gap-maxHeight):rect.bottom+gap,left:Math.max(margin,Math.min(rect.left,window.innerWidth-rect.width-margin)),width:rect.width,maxHeight});
  },[]);

  useLayoutEffect(()=>{if(open)updatePosition();},[open,updatePosition]);
  useEffect(()=>{
    if(!open)return;
    const reposition=()=>updatePosition();
    const onPointerDown=(event:PointerEvent)=>{const target=event.target as Node;if(!rootRef.current?.contains(target)&&!document.getElementById(listboxId)?.contains(target))setOpen(false);};
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape"){event.preventDefault();setOpen(false);triggerRef.current?.focus();}};
    window.addEventListener("resize",reposition);window.addEventListener("scroll",reposition,true);
    document.addEventListener("pointerdown",onPointerDown);document.addEventListener("keydown",onKeyDown);
    return()=>{window.removeEventListener("resize",reposition);window.removeEventListener("scroll",reposition,true);document.removeEventListener("pointerdown",onPointerDown);document.removeEventListener("keydown",onKeyDown);};
  },[open,updatePosition,listboxId]);
  useEffect(()=>()=>{if(typeaheadTimer.current)clearTimeout(typeaheadTimer.current);},[]);
  useEffect(()=>{
    if(controlled)return;
    const form=rootRef.current?.closest("form");
    if(!form)return;
    const reset=()=>setUncontrolledValue(defaultValue);
    form.addEventListener("reset",reset);
    return()=>form.removeEventListener("reset",reset);
  },[controlled,defaultValue]);

  const setValue=(nextValue:string)=>{
    if(!controlled)setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
    setOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.removeAttribute("aria-invalid");
    triggerRef.current?.focus();
  };
  const enabledIndices=normalizedOptions.map((option,index)=>option.disabled?-1:index).filter(index=>index>=0);
  const selectActive=()=>{const option=normalizedOptions[activeIndex];if(option&&!option.disabled)setValue(option.value);};
  const moveActive=(direction:1|-1)=>{
    if(!open){setOpen(true);const current=enabledIndices.find(index=>normalizedOptions[index].value===selectedValue);setActiveIndex(current??(direction===1?enabledIndices[0]:enabledIndices.at(-1))??-1);return;}
    const current=enabledIndices.indexOf(activeIndex);const next=current<0?(direction===1?0:enabledIndices.length-1):(current+direction+enabledIndices.length)%enabledIndices.length;setActiveIndex(enabledIndices[next]);
  };
  const onTriggerKeyDown=(event:React.KeyboardEvent<HTMLButtonElement>)=>{
    if(event.key==="ArrowDown"){event.preventDefault();moveActive(1);return;}
    if(event.key==="ArrowUp"){event.preventDefault();moveActive(-1);return;}
    if(event.key==="Home"&&open){event.preventDefault();setActiveIndex(enabledIndices[0]??-1);return;}
    if(event.key==="End"&&open){event.preventDefault();setActiveIndex(enabledIndices.at(-1)??-1);return;}
    if(event.key==="Enter"||event.key===" "){event.preventDefault();if(open)selectActive();else{setOpen(true);const current=enabledIndices.find(index=>normalizedOptions[index].value===selectedValue);setActiveIndex(current??enabledIndices[0]??-1);}return;}
    if(event.key==="Tab"){setOpen(false);return;}
    if(event.key.length===1&&!event.altKey&&!event.ctrlKey&&!event.metaKey){
      const query=(typeahead+event.key).toLocaleLowerCase();setTypeahead(query);if(typeaheadTimer.current)clearTimeout(typeaheadTimer.current);typeaheadTimer.current=setTimeout(()=>setTypeahead(""),700);
      const found=enabledIndices.find(index=>normalizedOptions[index].label.toLocaleLowerCase().startsWith(query));
      if(found!==undefined){setActiveIndex(found);if(open)optionRefs.current[found]?.scrollIntoView({block:"nearest"});else setValue(normalizedOptions[found].value);}
    }
  };

  useEffect(()=>{if(open&&activeIndex>=0)optionRefs.current[activeIndex]?.scrollIntoView({block:"nearest"});},[open,activeIndex]);
  const menu=open&&position&&typeof document!=="undefined"?createPortal(<div className="custom-select-menu" id={listboxId} role="listbox" aria-label={label} style={{position:"fixed",top:position.top,left:position.left,width:position.width,maxHeight:position.maxHeight}}>
    {normalizedOptions.map((option,index)=><div key={`${option.value}-${index}`} ref={element=>{optionRefs.current[index]=element;}} id={`${controlId}-option-${index}`} className={`custom-select-option${option.disabled?" disabled":""}${option.value===selectedValue?" selected":""}${index===activeIndex?" active":""}`} role="option" aria-selected={option.value===selectedValue} aria-disabled={option.disabled||undefined} onMouseEnter={()=>!option.disabled&&setActiveIndex(index)} onMouseDown={event=>event.preventDefault()} onClick={()=>!option.disabled&&setValue(option.value)}>{option.label}<span className="custom-select-check" aria-hidden="true">{option.value===selectedValue?"✓":""}</span></div>)}
  </div>,document.body):null;

  return <div className="custom-select" ref={rootRef}>
    <input className="custom-select-value" type="hidden" name={name} value={selectedValue}/>
    <button ref={triggerRef} id={controlId} type="button" className="custom-select-trigger" role="combobox" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={open?listboxId:undefined} aria-activedescendant={open&&activeIndex>=0?`${controlId}-option-${activeIndex}`:undefined} aria-required={required||undefined} aria-invalid={invalid||undefined} disabled={disabled} onClick={()=>{if(open){setOpen(false);}else{const current=enabledIndices.find(index=>normalizedOptions[index].value===selectedValue);setActiveIndex(current??enabledIndices[0]??-1);setOpen(true);}}} onKeyDown={onTriggerKeyDown}>
      <span className={selected?"custom-select-value-text":"custom-select-placeholder"}>{selected?.label||placeholder}</span><svg className="custom-select-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 6 4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    {menu}
  </div>;
}
