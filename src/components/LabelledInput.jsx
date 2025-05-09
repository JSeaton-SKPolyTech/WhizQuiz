const LabelledInput = function({label, id, type='text', setState, state}){
	return(
		<>
			<label htmlFor={id}>{label}:</label>
			<input id={id} name={id} onChange={(e)=>{setState(e.target.value)}} value={state} />
		</>
	)
};

export default LabelledInput;