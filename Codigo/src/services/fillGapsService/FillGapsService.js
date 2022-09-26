
class FillGapsService{
    
    generateGaps(text){
        let result = "";
        for(let i = 0; i < text.size; i++){
            let open = false;
            let openPos;
            if(text[i] === '{' && text[i+1] === '{'){
                open = true;
                openPos = i;
                result += text.slice(openPos, i);
            }
            else if(open && text[i] === '}' && text[i+1] === '}'){
                open = false;
                
            }
        }
    }
}