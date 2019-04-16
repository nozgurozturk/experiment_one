const nameReducer = (name='', action)=>{
    if(action.type==='GET_NAME'){
        return action.payload
    }
    return name;
}
export default nameReducer;