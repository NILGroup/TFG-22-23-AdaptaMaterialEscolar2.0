import style from "./Definition.module.css"
export default function Definition ({ attributes, children, element }){
  return (
    <div {...attributes}>
      {children}
    </div>
  )
}
