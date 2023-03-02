import React from 'react'

export default function RelateConceptsTable({title, values, setValores}) {
    let result = [];
    for(let i = 0; i < values?.length ?? 0; i++){
        let temp = values[i].map((value,j) => {
            return (
                <div key={`flechas_${j}`} className="p-1">
                    <input className="w-24 p-2 text-center" value={values[i][j]} onChange={(event)=>{
                        let temp1 = values.slice()
                        temp1[i][j] = event.target.value
                        setValores(temp1)
                    }}/>
                </div>
            )
        });
        result.push(
            <div key={`flechas_${i}`} className="flex flex-col border border-black rounded divide-y divide-black">
                {temp}
            </div>
        )
    }


  return (
    <div className="flex flex-col p-4 gap-3">
        <h4 className="text-modal-heading" htmlFor="newWord">
            {title}
        </h4>
        <div className="custom-scrollbar h-60 max-h-60 overflow-auto py-2">
            <div className='flex justify-around align-middle'>
                {result}
            </div>
        </div>
    </div>
  )
}
