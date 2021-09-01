/*A test is composed of the other states: anserList and Question
It is an array like: 
[
{question:"...", type:"...", answerList:"..."}, 
{question2:"...", type:"...", answerList2:"..."},
........
]
Type can be: text, radiobuttons(default), checkboxes
*/
import {createSlice} from "@reduxjs/toolkit";

const questionsCreatorSlice = createSlice({
    name: "questionsCreatorSlice",
    initialState: [],
    reducers: {
        addQuestion: (state, action) =>{return [...state, action.payload]},
        removeQuestion: (state, action) =>{
           // console.log(`Delete ${action.payload.index}`); 
            let questions_list = [...state];
            questions_list.splice(action.payload.index, 1);
            return questions_list;
        },//remove at index payload
        editQuestion: (state, action) =>{            
            let questions_list = [...state];
            questions_list.splice(action.payload.index, 1);
            return questions_list;},

        setState: (state, action) =>{return action.payload},///

        //To be used in answering 
        setAnswerSelected: (state, action) =>{
            let questions_list = [...state];
            let answers_q = questions_list[action.payload.index_q].answersList;
            if(questions_list[action.payload.index_q].type==="radiobuttons"){
                answers_q.map((ans,index) => {
                    if(index===action.payload.index_a){
                        ans["selected"]=true;
                    }else{ans["selected"]=false;}
                })
            }
            else if(questions_list[action.payload.index_q].type==="checkboxes"){
                answers_q.map((ans,index) => {
                    if(index===action.payload.index_a){
                        ans["selected"]===undefined ? 
                        ans["selected"]=true
                        :
                        ans["selected"]=!ans["selected"]
                    }
                })
            }
            else if(questions_list[action.payload.index_q].type==="text"){
                questions_list[action.payload.index_q].answer=action.payload.text;
            }

            questions_list[action.payload.index_q] = { ...questions_list[action.payload.index_q] , answersList:answers_q};
            return void(questions_list)
        },
    }
});

//export actions one by one
export const {addQuestion, removeQuestion, editQuestion, setState,setAnswerSelected} = questionsCreatorSlice.actions;
//export reducer as default
export default questionsCreatorSlice.reducer; 
