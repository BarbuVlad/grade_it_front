
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import CheckboxSubElement from './CheckboxSubElement';
const CheckboxElement = ({index, question, answersList}) => {
      
      return(
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{color:"white"}}>{index+1}. {question}</FormLabel>
            <FormGroup>
                {answersList.map( (answer, index_) => {
                  //console.log(index_);
                   return(
                    <div key={index_} style={{display:"flex", flexDirection:"row"}}>
                    <CheckboxSubElement key={index_} index={index_} answer={answer} color="primary"/>
        
                    </div>
)
                })}

            </FormGroup>
          </FormControl>
        </div>       
      ) 
}

export default CheckboxElement